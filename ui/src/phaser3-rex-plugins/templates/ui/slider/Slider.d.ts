// import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';
import RoundRecrangle from '../../../plugins/roundrectangle';


export default Slider;

declare namespace Slider {

    type InputTypes = 0 | 1 | -1 | 'drag' | 'pan' | 'click' | 'none';

    interface IConfig extends Sizer.IConfig {
        reverseAxis?: boolean,
        background?: Phaser.GameObjects.GameObject | RoundRecrangle.IConfig,
        track?: Phaser.GameObjects.GameObject | RoundRecrangle.IConfig,
        indicator?: Phaser.GameObjects.GameObject | RoundRecrangle.IConfig,
        thumb?: Phaser.GameObjects.GameObject | RoundRecrangle.IConfig,

        input?: InputTypes,

        gap?: number,

        value?: number,
        min?: number, max?: number,

        easeValue?: {
            duration?: number,
            ease?: string
        },

        valuechangeCallback: (newValue: number, oldValue: number, slider: Slider) => void,

        enable?: boolean,
    }
}

declare class Slider extends Sizer {
    constructor(
        scene: Phaser.Scene,
        config?: Slider.IConfig
    );

    value: number;
    getValue(min?: number, max?: number): number;
    setValue(value?: number, min?: number, max?: number): this;
    addValue(inc?: number, min?: number, max?: number): this;

    easeValueTo(value?: number, min?: number, max?: number): this;
    stopEaseValue(): this;
    setEaseValueDuration(duration: number): this;
    setEaseValueFunction(ease: string): this;

    setGap(gap?: number, min?: number, max?: number): this;
    gap: number;

    setEnable(enable?: boolean): this;
    enable: boolean;
}