import EventEmitter from "../../../utils/eventemitter/EventEmitter";
import {
    QuestionType as QuestionTypeRef,
    OptionsType as OptionsTypeRef
} from './types';
import Quest from '../quest/Quest';

export default QuestionManager;

declare namespace QuestionManager {

    type QuestionType = QuestionTypeRef;

    type OptionsType = OptionsTypeRef;

    type ConvertParamCallbackType = (s: string, key: string) => any;

    interface IAddQuestionsConfig {
        delimiter?: string,
        types?: {
            question?: string,
            option?: string,
        },
        convert?: true | ConvertParamCallbackType,
    }

    interface IConfig extends IAddQuestionsConfig {
        questions?: QuestionType[] | string,

        quest?: Quest.IConfig,

        eventEmitter?: EventEmitter | false,
    }

    namespace Events {
        type QuestCallbackType = (
            question: QuestionTypeRef,
            questionManager: QuestionManager,
            quest: Quest
        ) => void;
    }

    export class Quest { }

}

declare class QuestionManager extends EventEmitter {
    constructor(
        config?: QuestionManager.IConfig
    );

    add(
        questions: QuestionManager.QuestionType[] | string,
        config?: QuestionManager.IAddQuestionsConfig
    ): this;

    remove(key: string): this;

    removeAll(): this;

    get(key: string): QuestionManager.QuestionType;

    getKeys(out?: string[]): string[];

    has(key: string): boolean;

    readonly questions: QuestionManager.QuestionType[];

    getOption(
        question: string | QuestionManager.QuestionType,
        optionKey: string
    ): QuestionManager.OptionsType;

    startQuest(
        config?: Quest.IConfig
    ): this;

    getNextQuestion(
        questionKey?: string
    ): QuestionManager.QuestionType;

    isLastQuestion(): boolean;

    restartQuest(): this;

    getData(
        key: string,
        defaultValue?: any
    ): any;

    getData(): any[];

    setData(
        key: string,
        value: any
    ): this;

    incData(
        key: string,
        inc: number,
        defaultValue?: number
    ): this;

    mulData(
        key: string,
        mul: number,
        defaultValue?: number
    ): this;

    clearData(): this;

    newQuest(
        config?: Quest.IConfig
    ): Quest;
}