import IsPlainObject from '../../../utils/object/IsPlainObject.js';
import Quest from '../quest/Quest.js';

export default {
    newQuest(config) {
        var quest = new Quest(this, config);
        return quest;
    },

    startQuest(config) {
        if (this._quest) {
            this._quest
                .resetFromJSON(config)
                .start();
        } else {
            if (!IsPlainObject(config)) {
                config = {};
            }
            if (!config.hasOwnProperty('eventEmitter')) {
                config.eventEmitter = this;
            }
            this._quest = this.newQuest(config);
        }
        return this;
    },

    restartQuest() {
        this._quest.start();
        return this;
    },

    getNextQuestion(key) {
        return this._quest.getNextQuestion(key);
    },

    isLastQuestion() {
        return this._quest.isLastQuestion();
    },

};