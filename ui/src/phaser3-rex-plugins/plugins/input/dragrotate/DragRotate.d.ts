export default DragRotate;

declare namespace DragRotate {
    interface IConfig {
        x?: number,
        y?: number,
        maxRadius?: number,
        minRadius?: number,
        enable?: boolean,
    }

    namespace Evenets {
        type DragCallbackType = (
            dragRotate: DragRotate
        ) => void;
    }
}

declare class DragRotate extends Phaser.Events.EventEmitter {
    constructor(
        scene: Phaser.Scene,
        config?: DragRotate.IConfig
    );

    setEnable(enable?: boolean): this;
    toggleEnable(): this;
    enable: boolean;

    setOrigin(x: number, y: number): this;
    setOrigin(pointer: { x: number, y: number }): this;
    x: number;
    y: number;

    setRadius(maxRadius: number, minRadius?: number): this;
    maxRadius: number;
    minRadius: number;

    readonly deltaRotation: number;
    readonly deltAangle: number;
    readonly cw: boolean;
    readonly ccw: boolean;

    dragCancel(): this;

    readonly pointer: Phaser.Input.Pointer;
    readonly isDrag: boolean;
    readonly state: number;
}