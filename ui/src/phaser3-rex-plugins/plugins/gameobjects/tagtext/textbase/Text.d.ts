// import * as Phaser from 'phaser';
import CanvasGameObjectBase from '../../../utils/types/CanvasGameObjectBase';
import TextStyleBase from '../../textbase/textstyle/TextStyleInterface';

export default Text;

declare namespace Text {

    type MetricsType = {
        ascent: number,
        descent: number,
        fontSize: number
    };

    type FontConfigType = string |
    {
        fontFamily?: string,
        fontSize?: string,
        fontStyle?: string
    };

    type TextMarginsType = {
        left?: number
    };

    interface ImageData {
        key: string, frame?: string,
        width?: number, height?: number,
        y?: number,
        left?: number, right?: number,
    }

    interface TextStyle extends TextStyleBase {
        images?: ImageData[],
        interactive?: boolean,
        urlCursor?: string,
    }

    namespace Events {
        type AnyAreaCallbackType = (
            key: string,
            pointer: Phaser.Input.Pointer,
            localX: number,
            localY: number
        ) => void;

        type AreaCallbackType = (
            pointer: Phaser.Input.Pointer,
            localX: number,
            localY: number
        ) => void;
    }

}

declare class Text extends CanvasGameObjectBase {
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        content?: string,

        style?: Text.TextStyle
    );

    text: string;
    setText(text: string | number | string[]): this;
    appendText(
        text: string | number | string[],
        addCR?: boolean
    ): this;
    getPlainText(
        text?: string | undefined,
        start?: number, end?: number
    ): string;
    getWrappedText(
        text?: string | undefined,
        start?: number, end?: number
    ): string;
    getText(
        text?: string | undefined,
        start?: number, end?: number
    ): string;
    getSubString(
        text?: string | undefined,
        start?: number, end?: number
    ): string;

    updateText(runWrap?: boolean): this;

    setWrapMode(
        mode: 0 | 1 | 2 | 'none' | 'word' | 'char' | 'character'
    ): this;
    setWrapWidth(width: number): this;
    setWordWrapWidth(width: number): this;

    setFont(font: Text.FontConfigType): this;
    setFontFamily(family: string): this;
    setFontSize(size: number | string): this;
    setFontStyle(style: string): this;
    setStyle(style: Text.TextStyle): this;
    setTestString(string: string): this;

    setColor(
        color?: null | string | number
    ): this;
    setFill(
        color?: null | string | number
    ): this;

    setStroke(
        color?: null | string | number,
        thickness?: number
    ): this;

    setUnderline(
        color?: null | string | number,
        thickness?: number,
        ofset?: number
    ): this;
    setUnderlineColor(
        color?: null | string | number
    ): this;
    setUnderlineThinkness(thickness: number): this;
    setUnderlineOffset(ofset: number): this;

    setBackgroundColor(
        color?: null | string | number,
        color2?: null | string | number,
        isHorizontalGradient?: boolean
    ): this;
    setBackgroundStrokeColor(
        color?: null | string | number,
        lineWidth?: number
    ): this;
    setBackgroundCornerRadius(
        radius?: number,
        iteration?: number
    ): this;

    setShadow(
        x?: number, y?: number,
        color?: null | string | number,
        blur?: number,
        shadowStroke?: boolean,
        shadowFill?: boolean
    ): this;
    setShadowOffset(x: number, y: number): this;
    setShadowColor(color?: null | string | number): this;
    setShadowBlur(blur: number): this;
    setShadowStroke(enabled?: boolean): this;
    setShadowFill(enabled?: boolean): this;

    setAlign(align?: 'left' | 'center' | 'right'): this;
    setHAlign(align?: 'left' | 'center' | 'right'): this;
    setVAlign(align?: 'top' | 'center' | 'bottom'): this;

    addImage(
        imgKey: string,
        config?: {
            key: string,
            frame?: string,
            width?: number,
            height?: number,
            y?: number,
            left?: number,
            right?: number,
        }
    ): this;

    drawAreaBounds(
        graphics: Phaser.GameObjects.Graphics,
        color?: number
    ): this;

    setLineSpacing(value: number): this;

    setXOffset(value: number): this;

    setPadding(
        left?: number | {
            left?: number, right?: number, top?: number, bottom?: number
        },
        top?: number,
        right?: number,
        bottom?: number,
    ): this;

    setMaxLines(max?: number): this;

    measureTextMargins(
        testString: string,
        out?: Text.TextMarginsType
    ): Text.TextMarginsType;

    setResolution(value: number): this;

    setFixedSize(width?: number, height?: number): this;
    setSize(width?: number, height?: number): this;
    resize(width?: number, height?: number): this;

    getTextMetrics(): Text.MetricsType;

    setTextMetrics(
        metrics: Text.MetricsType,
        font: Text.FontConfigType
    ): this;

    generateTexture(
        key: string,
        x?: number, y?: number,
        width?: number, height?: number
    ): this;

    setUrlTagCursor(cursor?: string): this;
    urlTagCursor: string;

    style: {
        color: string | null,
        stroke: string | null,
        strokeThickness: number,

        underlineColor: string | null,
        underlineThickness: number,
        underlineOffset: number,

        backgroundColor: string | null,
        backgroundColor2: string | null,
        backgroundHorizontalGradient: boolean,

        backgroundStrokeColor: string | null,
        backgroundStrokeLineWidth: number,

        backgroundCornerRadius: number,
        backgroundCornerIteration: number | undefined,

        shadowColor: string | null,
        shadowOffsetX: number,
        shadowOffsetY: number,
        shadowBlur: number,
        shadowStroke: boolean,
        shadowFill: boolean,

        lineSpacing: number,
        maxLines: number,

        resolution: number,

        fixedWidth: number,
        fixedHeight: number,

        halign: string,
        valign: string,

        wrapWidth: number | null,
        wrapMode: number
    };

    padding: {
        left: number,
        right: number,
        top: number,
        bottom: number
    };

    lineSpacing: number;
}