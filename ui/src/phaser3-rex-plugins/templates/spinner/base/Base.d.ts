// import * as Phaser from 'phaser';
import BaseShape from '../../../plugins/gameobjects/shape/shapes/BaseShapes';

export default Base;

declare namespace Base {

    interface IConfig {
        x?: number, y?: number,
        width?: number, height?: number,
        color?: number,

        duration?: number,
        start?: boolean,

        ease?: string,
    }

}

declare class Base extends BaseShape {
    constructor(
        scene: Phaser.Scene,
        config?: Base.IConfig
    )

    start(duration?: number): this;
    pause(): this;
    resume(): this;
    stop(): this;
    readonly isRunning: boolean;

    setValue(t: number): this;
    value: number;

    setColor(color: number): this;
    color: number;

    setDuration(duration: number): this;
    duration: this;

    setEase(ease: string): this;
    ease: string;

    readonly centerX: number;
    readonly centerY: number;
    readonly radius: number;
}