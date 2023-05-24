export default CanvasFrameManager;

declare namespace CanvasFrameManager {
    interface IConfig {
        key: string,
        width?: number,
        height?: number,
        cellWidth?: number,
        cellHeight?: number,
        fillColor?: string
    }

    type DrawFrameCallback = (
        canvasElem: HTMLCanvasElement,
        context: CanvasRenderingContext2D,
        frameSize: {
            width: number,
            height: number
        }
    ) => void
}

declare class CanvasFrameManager {
    constructor(
        scene: Phaser.Scene,
        key: string,
        width?: number,
        height?: number,
        cellWidth?: number,
        cellHeight?: number,
        fillColor?: string
    );

    constructor(
        scene: Phaser.Scene,
        config: CanvasFrameManager.IConfig
    );

    readonly key: string;
    readonly canvas: HTMLCanvasElement;
    readonly context: CanvasRenderingContext2D;
    readonly width: number;
    readonly height: number;
    readonly cellWidth: number;
    readonly cellHeight: number;
    readonly isFull: boolean;

    destroy(): void;

    stop(): this;

    add(
        camera: Phaser.Cameras.Scene2D.BaseCamera
    ): this;

    draw(
        frameName: string | number,
        callback: CanvasFrameManager.DrawFrameCallback,
        scope?: object
    ): this;

    paste(
        frameName: string | number,
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    addEmptyFrame(
        frameName: string | number,
        width?: number,
        height?: number
    ): this;

    updateTexture(): this;

    remove(
        frameName: string | number
    ): this;

    clear(): this;

    hasFrameName(
        frameName: string | number
    ): boolean;
}