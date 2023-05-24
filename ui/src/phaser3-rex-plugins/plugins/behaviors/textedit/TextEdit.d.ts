import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import InputText from '../../inputtext';

export default TextEdit;

declare namespace TextEdit {
    interface IConfigOpen {
        type?: string,
        enterClose?: boolean,
        selectAll?: boolean,

        onOpen?: (textObject: Phaser.GameObjects.GameObject) => void,
        onTextChanged?: (textObject: Phaser.GameObjects.GameObject, text: string) => void,
        onClose?: (textObject: Phaser.GameObjects.GameObject) => void,

        text?: string,
        fontFamily?: string,
        fontSize?: string,
        color?: string,
        align?: string,
        style?: { [name: string]: any },
    }

    interface IConfig extends IConfigOpen {
        clickEnable?: boolean;
    }
}

declare class TextEdit extends ComponentBase {
    constructor(
        textObject: Phaser.GameObjects.GameObject
    );

    open(
        config?: TextEdit.IConfigOpen,
        onCloseCallback?: (textObject: Phaser.GameObjects.GameObject) => void
    ): this;

    close(): this;

    readonly isOpened: boolean;
    readonly text: string;

    readonly inputText: InputText;
}