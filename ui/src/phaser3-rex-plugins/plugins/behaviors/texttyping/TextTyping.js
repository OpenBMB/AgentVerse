import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import GetWrapText from '../../utils/text/GetWrapText.js';
import SetNoWrapText from '../../utils/text/SetNoWrapText.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;
const GetValue = Phaser.Utils.Objects.GetValue;

class TextTyping extends ComponentBase {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        this.timer = null;
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setTextWrapEnable(GetValue(o, 'wrap', false));
        this.setTypeMode(GetValue(o, 'typeMode', 0));
        this.setTypingSpeed(GetValue(o, 'speed', 333));
        this.setTextCallback = GetFastValue(o, 'setTextCallback', null);
        this.setTextCallbackScope = GetFastValue(o, 'setTextCallbackScope', null);

        this.setTypingContent(GetFastValue(o, 'text', ''));
        this.typingIdx = GetFastValue(o, 'typingIdx', 0);
        this.insertIdx = GetFastValue(o, 'insertIdx', null);

        var elapsed = GetFastValue(o, 'elapsed', null);
        if (elapsed !== null) {
            this.start(undefined, undefined, this.typingIdx, elapsed);
        }

        return this;
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.freeTimer();

        super.shutdown(fromScene);
    }

    setTypeMode(m) {
        if (typeof (m) === 'string') {
            m = TYPEMODE[m];
        }
        this.typeMode = m;
        return this;
    }

    setTypeSpeed(speed) {
        this.speed = speed;
        return this;
    }

    setTypingSpeed(speed) {
        this.speed = speed;
        return this;
    }

    setTextWrapEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.textWrapEnable = enable;
        return this;
    }

    set text(value) {
        var text = TransferText(value);
        if (this.textWrapEnable) {
            text = GetWrapText(this.parent, text);
        }

        this._text = text;
    }

    get text() {
        return this._text;
    }

    get isTyping() {
        return (this.getTimer() !== null);
    }

    get isLastChar() {
        return (this.typingIdx === this.textLen);
    }

    start(text, speed, startIdx, timerStartAt) {
        if (text !== undefined) {
            this.setTypingContent(text);
        }
        if (speed !== undefined) {
            this.speed = speed;
        }
        if (startIdx === undefined) {
            startIdx = 0;
        }

        this.typingIdx = startIdx + 1;
        if (this.speed === 0) {
            this.stop(true);
        } else {
            this.setText('');
            this.startTimer(timerStartAt);
        }

        return this;
    }

    appendText(text) {
        var newText = this.text.concat(TransferText(text));
        if (this.isTyping) {
            this.setTypingContent(newText);
        } else {
            this.start(newText, undefined, this.textLen);
        }

        return this;
    }

    stop(showAllText) {
        var timer = this.getTimer();
        if (timer) {
            this.freeTimer();
        }
        if (showAllText) {
            this.typingIdx = this.textLen;
            this.setText(this.text);
            this.emit('type');
            this.emit('complete', this, this.parent);
        }

        return this;
    }

    pause() {
        var timer = this.getTimer();
        if (timer) {
            timer.paused = true;
        }
        return this;
    }

    resume() {
        var timer = this.getTimer();
        if (timer) {
            timer.paused = false;
        }
        return this;
    }

    setTypingContent(text) {
        this.text = text;
        this.textLen = this.getTextLength(this.text);
        return this;
    }

    onTyping() {
        var newText = this.getTypingString(this.text, this.typingIdx, this.textLen, this.typeMode);

        this.setText(newText);

        this.emit('type');

        if (this.isLastChar) {
            this.freeTimer();
            this.emit('complete', this, this.parent);
        } else {
            this.timer.delay = this.speed; // delay of next typing            
            this.typingIdx++;
        }
    }

    getTypingString(text, typeIdx, textLen, typeMode) {
        var result;
        if (typeMode === 0) { //left-to-right
            var startIdx = 0;
            var endIdx = typeIdx;
            this.insertIdx = endIdx;
            result = this.getSubString(text, startIdx, endIdx);

        } else if (typeMode === 1) { //right-to-left
            var endIdx = textLen;
            var startIdx = endIdx - typeIdx;
            this.insertIdx = 0;
            result = this.getSubString(text, startIdx, endIdx);

        } else if (typeMode === 2) { //middle-to-sides
            var midIdx = textLen / 2;
            var startIdx = Math.floor(midIdx - (typeIdx / 2));
            var endIdx = startIdx + typeIdx;
            this.insertIdx = (typeIdx % 2) ? typeIdx : 0;
            result = this.getSubString(text, startIdx, endIdx);

        } else if (typeMode === 3) { //sides-to-middle
            var lowerLen = Math.floor(typeIdx / 2);
            var lowerResult;
            if (lowerLen > 0) {
                var endIdx = textLen;
                var startIdx = endIdx - lowerLen;
                lowerResult = this.getSubString(text, startIdx, endIdx);
            } else {
                lowerResult = "";
            }

            var upperLen = typeIdx - lowerLen;
            var upperResult;
            if (upperLen > 0) {
                var startIdx = 0;
                var endIdx = startIdx + upperLen;
                this.insertIdx = endIdx;
                upperResult = this.getSubString(text, startIdx, endIdx);
            } else {
                upperResult = "";
                this.insertIdx = 0;
            }
            result = upperResult + lowerResult;
        }

        return result;
    }

    startTimer(timerStartAt) {
        if (this.timer) {
            this.freeTimer();
        }
        var delay, startAt;
        if (timerStartAt === undefined) {
            delay = 0;
            startAt = 0;
        } else {
            delay = this.speed;
            startAt = timerStartAt;
        }

        this.timer = this.scene.time.addEvent({
            delay: 0.0001,
            startAt: startAt,
            loop: true,
            callback: this.onTyping,
            callbackScope: this
        });
        // Note: Throw error message if delay is 0 with repeat/loop

        return this;
    }

    getTimer() {
        return this.timer;
    }

    freeTimer() {
        if (this.timer) {
            this.timer.remove();
            this.timer = null;
        }

        return this;
    }

    setText(text) {
        if (this.setTextCallback) {
            if (this.setTextCallbackScope) {
                text = this.setTextCallback.call(this.setTextCallbackScope, text, this.isLastChar, this.insertIdx);
            } else {
                text = this.setTextCallback(text, this.isLastChar, this.insertIdx);
            }
        }

        if (this.textWrapEnable) {
            SetNoWrapText(this.parent, text);
        } else {
            this.parent.setText(text);
        }
    }

    getTextLength(text) {
        var gameObject = this.parent;
        var len;
        if (gameObject.getPlainText) {
            len = gameObject.getPlainText(text).length;
        } else {
            len = text.length;
        }

        return len;
    }

    getSubString(text, startIdx, endIdx) {
        var gameObject = this.parent;
        var result;
        if (gameObject.getSubString) {
            result = gameObject.getSubString(text, startIdx, endIdx);
        } else {
            result = text.slice(startIdx, endIdx);
        }

        return result;
    }
}

var TransferText = function (text) {
    if (Array.isArray(text)) {
        text = text.join('\n');
    } else if (typeof (text) === 'number') {
        text = text.toString();
    }
    return text;
}

const TYPEMODE = {
    'left-to-right': 0,
    'right-to-left': 1,
    'middle-to-sides': 2,
    'sides-to-middle': 3
};


export default TextTyping;