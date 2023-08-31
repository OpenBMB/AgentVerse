import EventEmitterMethods from '../../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../../utils/object/GetValue.js';
import Shuffle from '../../../utils/array/Shuffle.js';
import DataMethods from '../../../utils/data/DataMethods.js';

class Quest {
    constructor(questionsManager, config) {
        // Event emitter
        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));

        this.questionsManager = questionsManager;
        this.questionKeys = [];

        this.resetFromJSON(config);
        this.start();
    }

    resetFromJSON(o) {
        this.setShuffleQuestionsEnable(GetValue(o, 'shuffleQuestions', false));
        this.setShuffleOptionsEnable(GetValue(o, 'shuffleOptions', false));
        return this;
    }

    shutdown() {
        this.destroyEventEmitter();
        this.questionsManager = undefined;
    }

    destroy() {
        this.shutdown();
    }

    setShuffleQuestionsEnable(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.shuffleQuestionsEnable = enabled;
        return this;
    }

    setShuffleOptionsEnable(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.shuffleOptionsEnable = enabled;
        return this;
    }

    start() {
        // Reload keys
        this.questionKeys.length = 0;
        this.questionsManager.getKeys(this.questionKeys);
        if (this.shuffleQuestionsEnable) {
            Shuffle(this.questionKeys);
        }

        this.nextIndex = -1;
        this.nextKey = undefined;
        return this;
    }

    setNextKey(key) {
        if (key === undefined) {
            this.nextIndex++;
            this.nextKey = this.questionKeys[this.nextIndex];
        } else if (this.questionsManager.has(key)) {
            this.nextKey = key;
            this.nextIndex = this.questionKeys.indexOf(key);
        } else {
            // Error
        }
        return this;
    }

    getQuestion() {
        var question = this.questionsManager.get(this.nextKey);
        if (this.shuffleOptionsEnable) {
            var options = question.options;
            if (options) {
                Shuffle(options);
            }
        }
        this.emit('quest', question, this.questionsManager, this);
        return question;
    }

    getNextQuestion(key) {
        return this.setNextKey(key).getQuestion();
    }

    isLastQuestion() {
        return this.nextIndex === (this.questionKeys.length - 1);
    }

    getOption(question, optionKey) {
        if (optionKey === undefined) {
            optionKey = question;
            question = this.questionsManager.get(this.nextKey);
        }
        return this.questionsManager.getOption(question, optionKey);
    }
}

Object.assign(
    Quest.prototype,
    EventEmitterMethods,
    DataMethods
);

export default Quest;