// import * as Phaser from 'phaser';
import Canvas from '../../canvas/canvas/Canvas';
import Background from './bob/background/Background';
import InnerBounds from './bob/innerbounds/InnerBounds';
import { IConfigTextStyle as IConfigTextStyleBase } from './bob/char/TextStyle';
import BobBaseClass from './bob/Base';
import CharBobClass from './bob/char/CharData';
import ImageBobClass from './bob/image/ImageData';
import DrawBobClass from './bob/drawer/Drawer';
import CommandBobClass from './bob/command/Command';


export default DynamicText;

declare namespace DynamicText {

    type PaddingTypes = number |
    { left?: number, right?: number, top?: number, bottom?: number };

    interface IRadiusConfig {
        tl?: (number | { x?: number, y?: number }),
        tr?: (number | { x?: number, y?: number }),
        bl?: (number | { x?: number, y?: number }),
        br?: (number | { x?: number, y?: number })
    }

    interface IConfigBackground {
        color?: string | number | null,
        color2?: string | number | null,
        horizontalGradient?: boolean,

        stroke?: string | number | null,
        strokeThickness?: number,

        cornerRadius?: number |
        ({ x?: number, y?: number }) |
        IRadiusConfig,
        cornerIteration?: number
    }

    interface IConfigInnerBounds {
        color?: string | number | null,
        color2?: string | number | null,
        horizontalGradient?: boolean,

        stroke?: string | number | null,
        strokeThickness?: number,
    }

    interface IConfigTextStyle extends IConfigTextStyleBase {

    }

    interface IConfigImage {
        width?: number,
        height?: number,
        scaleX?: number,
        scaleY?: number,
    }

    type HAlignTypes = 0 | 1 | 2 | 'left' | 'center' | 'right';
    type VAlignTypes = 0 | 1 | 2 | 'top' | 'center' | 'bottom';

    interface IConfigWrapBase {
        callback?: string | Function,
        hAlign?: HAlignTypes,
        vAlign?: VAlignTypes,
    }

    interface IConfigWordWrap extends IConfigWrapBase {
        padding?: {
            top?: number, left?: number, right?: number, bottom?: number,
        },
        ascent?: number,
        lineHeight?: number,
        useDefaultTextHeight?: boolean,
        maxLines?: number,
        wrapWidth?: number,
        letterSpacing?: number,
        charWrap?: boolean
    }

    interface IConfigVerticalWrap extends IConfigWrapBase {
        padding: {
            top?: number, left?: number, right?: number, bottom?: number,
        },
        lineWidth?: number,
        maxLines?: number,
        fixedChildHeight?: number,
        charPerLine?: number,
        wrapHeight?: number,
        letterSpacing?: number,
        rtl?: boolean,
    }

    type BobBase = BobBaseClass;
    type CharBob = CharBobClass;
    type ImageBob = ImageBobClass;
    type DrawBob = DrawBobClass;
    type CommandBob = CommandBobClass;
    type RenderChildTypes = CharBob | ImageBob | DrawBob;

    interface IWrapResult {
        children: BobBase[],
        lines: ({
            children: BobBase[],
            width: number,
            height: number
        })[],
        isLastPage: boolean
    }

    interface IConfig {
        x?: number, y?: number,
        width?: number, height?: number,

        padding: PaddingTypes,

        background?: IConfigBackground,

        innerBounds?: IConfigInnerBounds,

        style?: IConfigTextStyle,

        text?: string,

        wrap?: IConfigWordWrap | IConfigVerticalWrap | IConfigWordWrap,

        testString?: string,

        childrenInteractive?: boolean,
    }

}

declare class DynamicText extends Canvas {
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        fixedWidth?: number, fixedHeight?: number,
        config?: DynamicText.IConfig
    );
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        config?: DynamicText.IConfig
    );
    constructor(
        scene: Phaser.Scene,
        config?: DynamicText.IConfig
    );

    background: Background;
    innerBounds: InnerBounds;
    children: DynamicText.BobBase[];
    lastAppendedChildren: DynamicText.BobBase[];

    clearContent(): this;

    createCharChild(
        text: string,
        style?: DynamicText.IConfigTextStyle
    ): DynamicText.CharBob;
    createCharChildren(
        text: string,
        style?: DynamicText.IConfigTextStyle
    ): DynamicText.CharBob[];
    setText(
        text: string,
        style?: DynamicText.IConfigTextStyle
    ): this;
    appendText(
        text: string,
        style?: DynamicText.IConfigTextStyle
    ): this;
    insertText(
        index: number,
        text: string,
        style?: DynamicText.IConfigTextStyle
    ): this;
    getText(activeOnly?: boolean): string;
    resetTextStyle(): this;
    modifyTextStyle(style: DynamicText.IConfigTextStyle): this;
    modifyDefaultTextStyle(style: DynamicText.IConfigTextStyle): this;
    text: string;

    setTestString(testString: string): this;
    testString: string;

    getCharChild(
        charIndex: number,
        activeOnly?: boolean
    ): DynamicText.CharBob;
    getCharChildIndex(
        charIndex: number,
        activeOnly?: boolean
    ): DynamicText.CharBob;
    getCharChildren(
        activeOnly?: boolean,
        out?: DynamicText.CharBob[]
    ): DynamicText.CharBob[]

    createImageChild(
        key: string, frame?: string | null,
        config?: DynamicText.IConfigImage
    ): DynamicText.ImageBob;
    appendImage(
        key: string, frame?: string | null,
        config?: DynamicText.IConfigImage
    ): this;

    createDrawerChild(
        renderCallback: (this: DynamicText.DrawBob) => void,
        width?: number,
        height?: number
    ): DynamicText.DrawBob;
    appendDrawer(
        renderCallback: (this: DynamicText.DrawBob) => void,
        width?: number,
        height?: number
    ): this;

    createCommandChild(
        name: string,
        callback: (param: unknown, name: string) => any,
        param: unknown,
        scope?: Object
    ): DynamicText.CommandBob;
    appendCommand(
        name: string,
        callback: (param: unknown, name: string) => any,
        param: unknown,
        scope?: Object
    ): this;

    removeChild(child: DynamicText.BobBase): this;
    removeChildren(): this;
    removeText(index: number, length?: number): this;

    popChild(child: DynamicText.BobBase): this;

    moveChildToFist(child: DynamicText.BobBase): this;
    moveChildToLast(child: DynamicText.BobBase): this;
    movechildUp(child: DynamicText.BobBase): this;
    movechildDown(child: DynamicText.BobBase): this;
    movechildAbove(
        child: DynamicText.BobBase,
        baseChild: DynamicText.BobBase
    ): this;
    movechildBelow(
        child: DynamicText.BobBase,
        baseChild: DynamicText.BobBase
    ): this;

    runWordWrap(
        config?: DynamicText.IConfigWordWrap
    ): DynamicText.IWrapResult;

    runVerticalWrap(
        config?: DynamicText.IConfigVerticalWrap
    ): DynamicText.IWrapResult;

    runWrap(
        config?: DynamicText.IConfigWordWrap | DynamicText.IConfigVerticalWrap | DynamicText.IConfigWrapBase
    ): DynamicText.IWrapResult;

    setVAlign(align: DynamicText.VAlignTypes): this;
    setHAlign(align: DynamicText.HAlignTypes): this;

    getChildren(): DynamicText.BobBase[];
    getLastAppendedChildren(): DynamicText.BobBase[];
    getActiveChildren(): DynamicText.BobBase[];

    setBackgroundColor(
        color?: string | number | null,
        color2?: string | number | null,
        horizontalGradient?: boolean
    ): this;
    setBackgroundStroke(
        stroke?: string | number | null,
        strokeThickness?: number,
    ): this;
    setBackgroundCornerRadius(
        cornerRadius?: number |
            ({ x?: number, y?: number }) |
            DynamicText.IRadiusConfig,
        cornerIteration?: number
    ): this;

    setInnerBoundsColor(
        color?: string | number | null,
        color2?: string | number | null,
        horizontalGradient?: boolean
    ): this;
    setInnerBoundsStroke(
        stroke?: string | number | null,
        strokeThickness?: number,
    ): this;

    getNearestChild(
        localX: number,
        localY: number
    ): DynamicText.BobBase;

    getCharWorldPosition(
        child: DynamicText.BobBase,
        offsetX?: number, offsetY?: number, out?: { x?: number, y?: number }
    ): { x: number, y: number };

    getCharWorldPosition(
        child: DynamicText.BobBase,
        out?: { x?: number, y?: number }
    ): { x: number, y: number };

    getCharWorldPosition(
        childIndex: number,
        offsetX?: number, offsetY?: number, out?: { x?: number, y?: number }
    ): { x: number, y: number };

    getCharWorldPosition(
        childIndex: number,
        out?: { x?: number, y?: number }
    ): { x: number, y: number };

}