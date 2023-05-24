import Label from '../label/Label.js';
import TextPage from '../textpage/TextPage.js';
import TextTyping from '../texttyping/TextTyping.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class TextBox extends Label {
    constructor(scene, config) {
        if (config === undefined) {
            config = {
                text: createDefaultTextObject(scene)
            }
        }

        super(scene, config);
        this.type = 'rexTextBox';

        var text = this.childrenMap.text;
        this.page = new TextPage(text, GetValue(config, 'page', undefined));
        this.typing = new TextTyping(text, GetValue(config, 'typing', config.type));
        this.typing
            .on('complete', this.onPageEnd, this)
            .on('type', this.onType, this);

        this.textWidth = text.width;
        this.textHeight = text.height;
    }

    start(text, speed) {
        this.page.setText(text);
        if (speed !== undefined) {
            this.setTypingSpeed(speed);
        }
        this.typeNextPage();
        return this;
    }

    typeNextPage() {
        if (!this.isLastPage) {
            var txt = this.page.getNextPage();
            this.typing.start(txt);
        } else {
            this.emit('complete');
        }
        return this;
    }

    pause() {
        this.typing.pause();
        return this;
    }

    resume() {
        this.typing.resume();
        return this;
    }

    stop(showAllText) {
        this.typing.stop(showAllText);
        return this;
    }

    setTypeSpeed(speed) {
        this.typing.setTypingSpeed(speed);
        return this;
    }

    setTypingSpeed(speed) {
        this.typing.setTypingSpeed(speed);
        return this;
    }

    get isTyping() {
        return this.typing.isTyping;
    }

    get isLastPage() {
        return this.page.isLastPage;
    }

    get isFirstPage() {
        return this.page.isFirstPage;
    }

    get pageCount() {
        return this.page.pageCount;
    }

    get pageIndex() {
        return this.page.pageIndex;
    }

    onType() {
        var text = this.childrenMap.text;
        if ((this.textWidth !== text.width) || (this.textHeight !== text.height)) {
            this.textWidth = text.width;
            this.textHeight = text.height;
            this.getTopmostSizer().layout();
        }
        this.emit('type');
    }

    onPageEnd() {
        this.emit('pageend');

        if (this.isLastPage) {
            this.emit('complete');
        }
    }

}

var createDefaultTextObject = function (scene) {
    return scene.add.text(0, 0, '', {
        wordWrap: {
            width: 200,
        },
        maxLines: 5
    });
};

export default TextBox;