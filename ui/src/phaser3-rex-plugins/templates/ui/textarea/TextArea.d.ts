// import * as Phaser from 'phaser';
import Scrollable from '../utils/scrollable/Scrollable';


export default TextArea;

declare namespace TextArea {

    interface IConfig extends Scrollable.IConfig {
        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            text?: number | {
                left?: number, right?: number, top?: number, bottom?: number,
            },

            header?: number,
            footer?: number,
        },

        text: Phaser.GameObjects.GameObject,
        textWidth?: number | undefined,
        textHeight?: number | undefined,
        textMask?: boolean,
        alwaysScrollable?: boolean,

        content?: string
    }

}

declare class TextArea extends Scrollable {
    constructor(
        scene: Phaser.Scene,
        config?: TextArea.IConfig
    );

    text: string;
    setText(text: string): this;
    appendText(text: string): this;

    scrollToLine(lineIndex: number): this;
    scrollToNextLine(lineCount?: number): this;
    readonly lineIndex: number;

    readonly lineHeight: number;
    readonly linesCount: number;
}