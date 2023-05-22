// import * as Phaser from 'phaser';
import OnePointerTracer from '../onepointertracer/OnePointerTracer';


export default Pan;

declare namespace Pan {

    interface IConfig extends OnePointerTracer.IConfig {
        threshold?: number,
    }

    namespace Events {
        type PanCallbackType = (
            pan: Pan,
            gameObject: Phaser.GameObjects.GameObject,
            lastPointer: Phaser.Input.Pointer
        ) => void;
    }
}

declare class Pan extends OnePointerTracer {
    constructor(
        gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
        config?: Pan.IConfig
    )

    setDragThreshold(distance: number): this;
    dragThreshold: number;

    readonly isPanned: boolean;
}