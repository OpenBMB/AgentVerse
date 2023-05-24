// import * as Phaser from 'phaser';
import OnePointerTracer from '../onepointertracer/OnePointerTracer';

export default Swipe;

declare namespace Swipe {

    interface IConfig extends OnePointerTracer.IConfig {
        threshold?: number,
        velocityThreshold?: number,
        dir: 0 | 1 | 2 | 3 | 'up&down' | 'left&right' | '4dir' | '8dir',
    }

    namespace Events {
        type SwipeCallbackType = (
            swipe: Swipe,
            gameObject: Phaser.GameObjects.GameObject,
            lastPointer: Phaser.Input.Pointer
        ) => void;
    }
}

declare class Swipe extends OnePointerTracer {
    constructor(
        gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
        config?: Swipe.IConfig
    )

    setDragThreshold(distance: number): this;
    dragThreshold: number;

    setVelocityThreshold(velocity: number): this;
    velocityThreshold: number;

    setDirectionMode(
        dirMode: 0 | 1 | 2 | 3 | 'up&down' | 'left&right' | '4dir' | '8dir'
    ): this;
    dirMode: number;

    readonly isSwiped: boolean;
}