import { Dialog } from '../ui/ui-components';
import QuestManager from '../../plugins/quest'

export default DialogQuest;

declare namespace DialogQuest {
    interface IConfig extends QuestManager.IConfig {
        dialog: Dialog,
    }

    namespace Events {
        type UpdateChoiceCallbackType = (
            choice: Phaser.GameObjects.GameObject,
            option: QuestManager.QuestionType,
            quest: QuestManager.Quest
        ) => void;

        type UpdateDialogCallbackType = (
            dialog: Dialog,
            question: QuestManager.QuestionType,
            quest: QuestManager.Quest
        ) => void;

        type ClickChoiceCallbackType = (
            choice: Phaser.GameObjects.GameObject,
            dialog: Dialog,
            quest: QuestManager.Quest
        ) => void;

        type ClickActionCallbackType = (
            action: Phaser.GameObjects.GameObject,
            dialog: Dialog,
            quest: QuestManager.Quest
        ) => void;
    }
}

declare class DialogQuest extends Phaser.Events.EventEmitter {
    constructor(
        config?: DialogQuest.IConfig
    );

    start(): this;

    next(key?: string): this;

    isLast(): boolean;

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
}