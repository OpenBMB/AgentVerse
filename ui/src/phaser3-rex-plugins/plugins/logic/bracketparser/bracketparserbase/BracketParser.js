import EventEmitterMethods from '../../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../../utils/object/GetValue.js';
import DefaultValueConverter from '../../../utils/string/TypeConvert.js';
import EscapeRegex from '../../../utils/string/EscapeRegex.js';

class BracketParser {
    constructor(config) {
        // Event emitter
        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));

        // Value convert
        this.setValueConverter(GetValue(config, 'valueConvert', true));
        // Loop
        this.setLoopEnable(GetValue(config, 'loop', false));

        // Brackets and generate regex
        this.setMultipleLinesTagEnable(GetValue(config, 'multipleLinesTag', false));
        var delimiters = GetValue(config, 'delimiters', '<>');
        this.setDelimiters(delimiters[0], delimiters[1]);

        // Translate tagName callback
        this.setTranslateTagNameCallback(GetValue(config, 'translateTagNameCallback'));

        this.isRunning = false;
        this.isPaused = false;
        this.skipEventFlag = false;
        this.justCompleted = false;
        this.lastTagStart = null;
        this.lastTagEnd = null;
        this.lastContent = null;
    }

    shutdown() {
        this.destroyEventEmitter();
    }

    destroy() {
        this.shutdown();
    }

    setMultipleLinesTagEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.multipleLinesTagEnable = enable;
        return this;
    }

    // Override
    setDelimiters(delimiterLeft, delimiterRight) {
        if (delimiterRight === undefined) {
            delimiterRight = delimiterLeft[1];
            delimiterLeft = delimiterLeft[0];
        }
        this.delimiterLeft = delimiterLeft;
        this.delimiterRight = delimiterRight;

        delimiterLeft = EscapeRegex(this.delimiterLeft);
        delimiterRight = EscapeRegex(this.delimiterRight);

        var flag = (this.multipleLinesTagEnable) ? 'gs' : 'gi';
        this.reSplit = RegExp(`${delimiterLeft}(.+?)${delimiterRight}`, flag);

        return this;
    }

    setTranslateTagNameCallback(callback) {
        this.translateTagNameCallback = callback;
        return this;
    }

    setValueConverter(converter) {
        if (converter === true) {
            converter = DefaultValueConverter;
        } else if (!converter) {
            converter = BypassValueConverter;
        }
        this.valueConverter = converter;
        return this;
    }

    setLoopEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.loopEnable = enable;
        return this;
    }

    setSource(source) {
        this.source = source;
        return this;
    }

    resetIndex(index) {
        if (index === undefined) {
            index = 0;
        }
        this.progressIndex = index;
        this.reSplit.lastIndex = index;
        this.lastTagStart = null;
        this.lastTagEnd = null;
        this.lastContent = null;
        this.justCompleted = false;
        this.isRunning = false;
        return this;
    }

    start(source) {
        this
            .setSource(source)
            .restart();
        return this;
    }

    restart() {
        this
            .resetIndex()
            .next();
    }

    next() {
        if (this.isPaused) {
            this.onResume();
        }

        // Don't re-enter this method
        if (this.isRunning) {
            return this;
        }

        this.isRunning = true;

        if (this.justCompleted) {
            this.isRunning = false;
            return this;
        }

        if (this.reSplit.lastIndex === 0) {
            this.onStart();
        }

        var text = this.source,
            lastIndex = text.length;

        this.reSplit.lastIndex = this.progressIndex;
        while (true) {
            var regexResult = this.reSplit.exec(text);
            // No tag found, complete
            if (!regexResult) {
                if (this.progressIndex < lastIndex) {
                    this.onContent(text.substring(this.progressIndex, lastIndex));
                    // Might pause here
                    if (this.isPaused) {
                        this.progressIndex = lastIndex;
                        break;
                    }
                }
                this.onComplete();
                this.isRunning = false;
                return;
            }

            var matchEnd = this.reSplit.lastIndex;
            var matchStart = matchEnd - regexResult[0].length;

            // Process content between previous tag and current tag            
            if (this.progressIndex < matchStart) {
                this.onContent(text.substring(this.progressIndex, matchStart));
                // Might pause here
                if (this.isPaused) {
                    this.progressIndex = matchStart;
                    break;
                }
            }

            // Process current tag
            this.onTag(regexResult[1]);

            this.progressIndex = matchEnd;
            // Might pause here
            if (this.isPaused) {
                break;
            }

        }

        this.isRunning = false;
        return this;
    }

    skipEvent() {
        this.skipEventFlag = true;
        return this;
    }

    pause() {
        if (!this.isPaused) {
            this.onPause();
        }
        return this;
    }

    pauseUntilEvent(eventEmitter, eventName) {
        if (this.isPaused) {
            return this;
        }

        this.pause();
        eventEmitter.once(eventName, function () {
            this.next();
        }, this);
        return this;
    }

    onContent(content) {
        this.skipEventFlag = false;
        this.emit('content', content);
        this.lastContent = content;
    }

    // Override
    onTag(tagContent) {

    }

    onStart() {
        this.isRunning = true;
        this.emit('start', this);
    }

    onComplete() {
        this.isRunning = false;
        this.justCompleted = true;
        this.emit('complete', this);
        if (this.loopEnable) {
            this.resetIndex();
        }
    }

    onPause() {
        this.isPaused = true;
        this.emit('pause', this);
    }

    onResume() {
        this.isPaused = false;
        this.emit('resume', this);
    }

}

const BypassValueConverter = function (s) { return s; }

Object.assign(
    BracketParser.prototype,
    EventEmitterMethods,
);

export default BracketParser;