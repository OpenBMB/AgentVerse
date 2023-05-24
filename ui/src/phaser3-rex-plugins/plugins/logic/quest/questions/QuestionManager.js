import EventEmitterMethods from '../../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../../utils/object/GetValue.js';
import ParseInputData from './parse/ParseInputData.js';
import RemoveItem from '../../../utils/array/Remove.js';
import Clear from '../../../utils/object/Clear.js';
import AddQuestion from './AddQuestion.js';
import QuestMethods from './QuestMethods.js';
import DataMethods from './DataMethods.js';

class QuestionManager {
    constructor(config) {
        // Event emitter. Create a private event emitter for private quest task object.
        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));

        this.questions = [];
        this.questionMap = {};
        this._quest = undefined;

        var questions = GetValue(config, 'questions', undefined);
        if (questions) {
            this.add(questions, config);
        }
        var questConfig = GetValue(config, 'quest', undefined);
        if (questConfig) {
            this.startQuest(questConfig)
        }
    }

    shutdown() {
        this.destroyEventEmitter();
        if (this._quest) {
            this._quest.destroy();
            this._quest = undefined;
        }
    }

    destroy() {
        this.shutdown();
    }

    add(question, config) {
        question = ParseInputData(question, config);

        if (Array.isArray(question)) {
            var questions = question;
            for (var i = 0, cnt = questions.length; i < cnt; i++) {
                AddQuestion.call(this, questions[i]);
            }
        } else {
            AddQuestion.call(this, question);
        }

        return this;
    }

    remove(key) {
        if (this.questionMap.hasOwnProperty(key)) {
            RemoveItem(this.questions, this.questionMap[key]);
            delete this.questionMap[key];
        }
        return this;
    }

    removeAll() {
        this.questions.length = 0;
        Clear(this.questionMap);
    }

    has(key) {
        return this.questionMap.hasOwnProperty(key);
    }

    get(key) {
        return this.questionMap[key];
    }

    getKeys(out) {
        if (out === undefined) {
            out = [];
        }
        for (var i = 0, cnt = this.questions.length; i < cnt; i++) {
            out.push(this.questions[i].key);
        }
        return out;
    }

    getOption(question, optionKey) {
        if (typeof (question) === 'string') {
            question = this.get(question);
        }
        if (!question) {
            return null;
        }
        var options = question.options;
        if (options) {
            var option;
            for (var i = 0, cnt = options.length; i < cnt; i++) {
                option = options[i];
                if (option.key === optionKey) {
                    return option;
                }
            }
        }
        return null;
    }
}

Object.assign(
    QuestionManager.prototype,
    EventEmitterMethods,
    QuestMethods,
    DataMethods
);

export default QuestionManager;