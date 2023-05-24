// import * as Phaser from 'phaser';
import CanvasGameObjectBase from '../../../utils/types/CanvasGameObjectBase';

export default class Canvas extends CanvasGameObjectBase {
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number
    );

    setSize(width: number, height: number): this;
    resize(width: number, height: number): this;
    setCanvasSize(width: number, height: number): this;

    getCanvas(readOnly?: boolean): HTMLCanvasElement;
    canvas: HTMLCanvasElement;
    getContext(readOnly?: boolean): CanvasRenderingContext2D;
    context: CanvasRenderingContext2D;

    needRedraw(): this;
    dirty: boolean;

    clear(): this;
    fill(color: string): this;

    updateTexture(
        callback?: (canvasElem: HTMLCanvasElement, context: CanvasRenderingContext2D) => void,
        scope?: object
    ): this;

    generateTexture(
        key: string | number,
        x?: number, y?: number,
        width?: number, height?: number
    ): this;

    loadTexture(
        key: string,
        frame?: string,
    ): this;

    drawFrame(
        key: string,
        frame?: string,
        dx?: number,
        dy?: number,
        dWidth?: number,
        dHeight?: number,
        sxOffset?: number,
        syOffset?: number,
        sWidth?: number,
        sHeight?: number,
    ): this;

    getDataURL(
        type?: string,
        encoderOptions?: number
    ): string;

    getPixel(
        x: number, y: number
    ): Phaser.Display.Color;

    setPixel(
        x: number, y: number,
        r: number | Phaser.Display.Color,
        g?: number,
        b?: number,
        a?: number
    ): this;

}