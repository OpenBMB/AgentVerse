// import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';
import RoundRecrangle from '../../../plugins/roundrectangle';

export default ScrollBar;

declare namespace ScrollBar {

    type SliderInputTypes = 0 | 1 | -1 | 'drag' | 'pan' | 'click' | 'none';

    interface IConfig extends Sizer.IConfig {
        space?: {
            left?: number,
            right?: number,
            top?: number,
            bottom?: number,
        },

        background?: Phaser.GameObjects.GameObject,

        buttons?: {
            top?: Phaser.GameObjects.GameObject,
            bottom?: Phaser.GameObjects.GameObject,
            left?: Phaser.GameObjects.GameObject,
            right?: Phaser.GameObjects.GameObject,

            step?: number,
        },

        slider?: {
            background?: Phaser.GameObjects.GameObject | RoundRecrangle.IConfig,
            track?: Phaser.GameObjects.GameObject | RoundRecrangle.IConfig,
            indicator?: Phaser.GameObjects.GameObject | RoundRecrangle.IConfig,
            thumb?: Phaser.GameObjects.GameObject | RoundRecrangle.IConfig,
            input?: SliderInputTypes,
            gap?: number,
            easeValue?: {
                duration?: number,
                ease?: string
            },
        }

        valuechangeCallback?: (newValue: number, oldValue: number, ScrollBar: ScrollBar) => void,

        enable?: boolean,
    }
}

declare class ScrollBar extends Sizer {
    constructor(
        scene: Phaser.Scene,
        config?: ScrollBar.IConfig
    );

    value: number;
    getValue(min?: number, max?: number): number;
    setValue(value?: number, min?: number, max?: number): this;
    addValue(inc?: number, min?: number, max?: number): this;

    easeValueTo(value?: number, min?: number, max?: number): this;
    stopEaseValue(): this;
    setEaseValueDuration(duration: number): this;
    setEaseValueFunction(ease: string): this;

    setEnable(enable?: boolean): this;
    enable: boolean;
}