// import * as Phaser from 'phaser';
import OnePointerTracer from '../onepointertracer/OnePointerTracer';

export default Press;

declare namespace Press {

    export interface IConfig extends OnePointerTracer.IConfig {
        time?: number,
        threshold?: number,
    }

    namespace Events {
        type PressCallbackType = (
            press: Press,
            gameObject: Phaser.GameObjects.GameObject,
            lastPointer: Phaser.Input.Pointer
        ) => void;
    }
}

declare class Press extends OnePointerTracer {
    constructor(
        gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
        config?: Press.IConfig
    )

    setHoldTime(time: number): this;
    holdTime: number;
    setDragThreshold(distance: number): this;
    dragThreshold: number;

    readonly isPressed: boolean;
}