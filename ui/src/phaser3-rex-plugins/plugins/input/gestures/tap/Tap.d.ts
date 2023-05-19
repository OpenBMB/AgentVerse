// import * as Phaser from 'phaser';
import OnePointerTracer from '../onepointertracer/OnePointerTracer';

export default Tap;

declare namespace Tap {

    export interface IConfig extends OnePointerTracer.IConfig {
        time?: number,
        tapInterval?: number,
        threshold?: number,
        tapOffset?: number,

        taps?: number | undefined,
        minTaps?: number | undefined,
        maxTaps?: number | undefined,
    }

    namespace Events {
        type TapCallbackType = (
            tap: Tap,
            gameObject: Phaser.GameObjects.GameObject,
            lastPointer: Phaser.Input.Pointer
        ) => void;
    }

}

declare class Tap extends OnePointerTracer {
    constructor(
        gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
        config?: Tap.IConfig
    )

    setHoldTime(time: number): this;
    holdTime: number;
    setTapInterval(time: number): this;
    tapInterval: number;

    setDragThreshold(distance: number): this;
    dragThreshold: number;
    setTapOffset(distance: number): this;
    tapOffset: number;

    setMaxTaps(amount: number): this;
    maxTaps: number;
    setMaxTaps(amount: number): this;
    minTaps: number;
    setTaps(minTaps: number, maxTaps: number): this;

    readonly isTapped: boolean;
}