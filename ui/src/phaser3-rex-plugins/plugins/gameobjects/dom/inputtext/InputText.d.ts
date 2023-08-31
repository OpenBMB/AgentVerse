export default InputText;

declare namespace InputText {
    interface IConfig {
        x?: number,
        y?: number,
        width?: number,
        height?: number,

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

    namespace Events {
        type TextChangeCallbackType = (inputText: InputText, e: Event) => void;
        type FocusCallbackType = (inputText: InputText, e: Event) => void;
        type BlurCallbackType = (inputText: InputText, e: Event) => void;
        type ClickCallbackType = (inputText: InputText, e: Event) => void;
        type DoubleClickCallbackType = (inputText: InputText, e: Event) => void;
        type SelectCallbackType = (inputText: InputText, e: Event) => void;
        type PointerDownCallbackType = (inputText: InputText, e: Event) => void;
        type PointerMoveCallbackType = (inputText: InputText, e: Event) => void;
        type PointerUpCallbackType = (inputText: InputText, e: Event) => void;
        type KeyDownCallbackType = (inputText: InputText, e: Event) => void;
        type KeyPressCallbackType = (inputText: InputText, e: Event) => void;
        type KeyUpCallbackType = (inputText: InputText, e: Event) => void;
    }
}

declare class InputText extends Phaser.GameObjects.DOMElement {
    constructor(scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        config?: InputText.IConfig
    );

    constructor(scene: Phaser.Scene,
        x: number, y: number,
        config?: InputText.IConfig
    );

    constructor(scene: Phaser.Scene,
        config?: InputText.IConfig
    );

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

    resize(width: number, height: number): this;
}