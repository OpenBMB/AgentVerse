import ComponentBase from '../../utils/componentbase/ComponentBase';

export default HiddenTextEditBase;

declare namespace HiddenTextEditBase {
    type OnOpenCallbackType = (
        textObject: Phaser.GameObjects.GameObject,
        hiddenInputText: HiddenTextEditBase,
    ) => void;

    type OnCloseCallbackType = (
        textObject: Phaser.GameObjects.GameObject,
        hiddenInputText: HiddenTextEditBase,
    ) => void;

    type OnUpdateCallbackType = (
        text: string,
        textObject: Phaser.GameObjects.GameObject,
        hiddenInputText: HiddenTextEditBase,
    ) => void | string;


    interface IConfig {
        enterClose?: boolean;

        onOpen: OnOpenCallbackType;

        onClose: OnCloseCallbackType;

        onUpdate: OnUpdateCallbackType | 'number';

        // Copy from InputText
        type?: string,

        // Element properties
        id?: string,
        text?: string,
        maxLength?: number,
        minLength?: number,
        placeholder?: string,
        tooltip?: string,
        readOnly?: boolean,
        spellCheck?: boolean,
        autoComplete?: 'on' | 'off',

        // Style properties
        align?: string,
        paddingLeft?: string,
        paddingRight?: string,
        paddingTop?: string,
        paddingBottom?: string,
        fontFamily?: string,
        fontSize?: string,
        color?: string,
        border?: number,
        backgroundColor?: string,
        borderColor?: string,
        outline?: string,

        selectAll?: boolean,
    }

    type UpdateTextCallbackType = (
        newText: string,
        hiddenInputText: HiddenTextEditBase,
    ) => string;
}

declare class HiddenTextEditBase extends ComponentBase {
    constructor(
        textObject: Phaser.GameObjects.GameObject,
        config?: HiddenTextEditBase.IConfig
    );

    setEnterClose(
        value?: boolean
    ): this;

    open(): this;
    close(): this;
    readonly isOpened: boolean;

    // Copy from InputText
    setText(text: string): this;
    text: string;

    selectText(
        selectionStart?: number,
        selectionEnd?: number
    ): this;
    selectAll(): this;
    readonly selectionStart: number;
    readonly selectionEnd: number;
    readonly selectedText: string;

    setCursorPosition(value: number): this;
    cursorPosition: number;

    scrollToBottom(): this;

    getStyle(key: string): string;

    setStyle(key: string, value?: number | string): this;

    setFocus(): this;
    setBlur(): this;
    readonly isFocused: boolean;

    setFontColor(color: string): this;
    fontColor: string;

    setMaxLength(value: number): this;
    maxLength: number;

    setMinLength(value: number): this;
    minLength: number;

    setPlaceholder(value: string): this;
    placeholder: string;

    setTooltip(value: string): this;
    tooltip: string;
}