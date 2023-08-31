// import * as Phaser from 'phaser';
import TwoPointersTracer from '../twopointerstracer/TwoPointersTracer';

export default Pinch;

declare namespace Pinch {

    interface IConfig extends TwoPointersTracer.IConfig {
        threshold?: number,
    }

    namespace Events {
        type PinchCallbackType = (
            pinch: Pinch,
        ) => void;
    }
}

declare class Pinch extends TwoPointersTracer {
    constructor(
        gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
        config?: Pinch.IConfig
    )

    setDragThreshold(distance: number): this;
    dragThreshold: number;

    readonly scaleFactor: number;
    readonly isPinched: boolean;
}