// import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';
import RoundRecrangle from '../../../plugins/roundrectangle';

export default NumberBar;

declare namespace NumberBar {

    type SliderInputTypes = 0 | 1 | -1 | 'drag' | 'pan' | 'click' | 'none';

    interface IConfig extends Sizer.IConfig {
        space?: {
            left?: number,
            right?: number,
            top?: number,
            bottom?: number,

            icon?: number,
            slider?: number,
        },

        background?: Phaser.GameObjects.GameObject,

        icon?: Phaser.GameObjects.GameObject,

        iconMask?: boolean,

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

        text?: Phaser.GameObjects.GameObject,

        valuechangeCallback?: (newValue: number, oldValue: number, numberBar: NumberBar) => void,

        enable?: boolean,
    }
}

declare class NumberBar extends Sizer {
    constructor(
        scene: Phaser.Scene,
        config?: NumberBar.IConfig
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

    text: string;
    setText(text: string): this;

}