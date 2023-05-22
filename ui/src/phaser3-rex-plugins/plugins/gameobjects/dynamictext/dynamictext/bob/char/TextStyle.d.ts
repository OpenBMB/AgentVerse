export interface IConfigTextStyle {
    bold?: boolean,
    italic?: boolean,
    fontSize?: string | number,
    fontFamily?: string,
    color?: string | number | null,
    stroke?: string | number | null,
    strokeThickness?: number,
    shadowColor?: string | number | null,
    shadowOffsetX?: number,
    shadowOffsetY?: number,
    shadowBlur?: number,
    backgroundColor?: string | number | null,
    offsetX?: number,
    offsetY?: number,
    leftSpace?: number,
    rightSpace?: number,
}

export default class TextStyle {
    modify(o?: IConfigTextStyle): this;

    setBold(bold?: boolean): this;
    bold: boolean;
    setItalic(italic?: boolean): this;
    italic: boolean;

    setFontSize(fontSize: string | number): this;
    fontSize: string;

    setFontFamily(fontFamily: string): this;
    fontFamily: string;

    readonly font: string;

    setColor(color?: number | string | null): this;
    color: string | null;

    setStrokeStyle(
        stroke?: number | string | null,
        strokeThickness?: number
    ): this;
    stroke: string | null;
    strokeThickness: number;

    setShadowColor(color?: number | string | null): this;
    shadowColor: string | null;
    setShadowOffset(offsetX?: number, offsetY?: number): this;
    shadowOffsetX: number;
    shadowOffsetY: number;
    setShadowBlur(blur?: number): this;
    shaodwBlur: number;
    setShadow(
        color?: number | string | null,
        offsetX?: number,
        offsetY?: number,
        blur?: number
    ): this;

    setBackgroundColor(color?: number | string | null): this;

    setOffsetX(offsetX?: number): this;
    offsetX: number;
    setOffsetY(offsetY?: number): this;
    offsetY: number;
    setOffset(offsetX?: number, offsetY?: number): this;

    setLeftSpace(space?: number): this;
    leftSpace: number;
    setRightSpace(space?: number): this;
    rightSpace: number;
    setSpace(leftSpace?: number, rightSpace?: number): this;

}