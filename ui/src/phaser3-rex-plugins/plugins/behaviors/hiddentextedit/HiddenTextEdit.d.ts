import HiddenTextEditBase from './HiddenTextEditBase';

export default HiddenTextEdit;

declare namespace HiddenTextEdit {
    interface IConfig extends HiddenTextEditBase.IConfig {
        cursor?: string;
        cursorFlashDuration?: number;
    }

    type UpdateTextCallbackType = (
        newText: string,
        hiddenInputText: HiddenTextEdit,
    ) => string;
}

declare class HiddenTextEdit extends HiddenTextEditBase {
    constructor(
        textObject: Phaser.GameObjects.GameObject,
        config?: HiddenTextEdit.IConfig
    );

    setCursor(
        s: string
    ): this;
    readonly cursor: string;

    setCursorFlashDuration(
        duration: number
    ): this;
}