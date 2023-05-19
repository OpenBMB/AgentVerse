import {
    QuestionType as QuestionTypeRef,
    OptionsType as OptionsTypeRef
} from '../questions/types';
import DataMethods from '../../../utils/data/DataMethods';

export default Quest;

declare namespace Quest {
    type QuestionType = QuestionTypeRef;
    type OptionsType = OptionsTypeRef;

    interface IConfig {
        shuffleQuestions?: boolean,
        shuffleOptions?: boolean,
    }
}

declare class Quest extends DataMethods{
    getNextQuestion(
        questionKey?: string
    ): Quest.QuestionType;


    isLastQuestion(): boolean;

    start(): this;

    getOption(
        question: string | Quest.QuestionType,
        optionKey: string
    ): Quest.OptionsType;

}