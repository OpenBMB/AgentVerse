import BaseShapes from '../shapes/BaseShapes';

export default ToggleSwitch;

declare namespace ToggleSwitch {
    interface IConfig {
        x: number, y: number,
        width: number, height: number,

        color?: number, trackFillAlpha?: number,
        falseValueTrackColor?: number, falseValueTrackFillAlpha?: number,

        thumbColor?: number, thumbAlpha?: number,

        trackWidth?: number, trackHeight?: number,
        trackRadius?: number,

        thumbWidth?: number, thumbHeight?: number,
        thumbRadius?: number,

        thumbLeft?: number, thumbRight?: number,
        rtl?: boolean,

        animationDuration?: number,

        value?: boolean,
    }
}

declare class ToggleSwitch extends BaseShapes {
    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        color?: number,
        config?: ToggleSwitch.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number,
        config?: ToggleSwitch.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        config?: ToggleSwitch.IConfig
    );

    setValue(value: boolean): this;
    toggleValue(): this;
    value: boolean;

    setTrackFillStyle(color: number, alpha?: number): this;
    trackFillColor: number;
    trackFillAlpha: number;
    setFalseValueTrackFillStyle(color: number, alpha?: number): this;
    falseValueTrackColor: number;
    falseValueTrackFillAlpha: number;

    setThumbStyle(color: number, alpha?: number): this;
    thumbColor: number;
    thumbAlpha: number;

    setTrackSize(width: number, height: number): this;
    trackWidth: number;
    trackHeight: number;
    setTrackRadius(radius: number): this;
    trackRadius: number;

    setThumbSize(width: number, height: number): this;
    thumbWidth: number;
    thumbHeight: number;
    setThumbRadius(radius: number): this;
    thumbRadius: number;

    setThumbPosition(left: number, right?: number): this;
    thumbLeftX: number;
    thumbRightX: number;

    setRTL(rtl?: boolean): this;
    rtl: boolean;

    setToggleAnimationDuration(duration: number): this;
    toggleAnimProgress: number;
}