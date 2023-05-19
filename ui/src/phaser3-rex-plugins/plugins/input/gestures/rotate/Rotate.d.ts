// import * as Phaser from 'phaser';
import TwoPointersTracer from '../twopointerstracer/TwoPointersTracer';


export default Rotate;

declare namespace Rotate {

    interface IConfig extends TwoPointersTracer.IConfig {
        threshold?: number,
    }

    namespace Events {
        type RotateCallbackType = (
            rotate: Rotate,
        ) => void;
    }
}

declare class Rotate extends TwoPointersTracer {
    constructor(
        gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
        config?: Rotate.IConfig
    )

    setDragThreshold(distance: number): this;
    dragThreshold: number;

    spinObject(
        gameObejects: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[]
    ): this;

    readonly rotation: number;
    readonly isRotated: boolean;
}