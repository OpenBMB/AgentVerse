import Sizer from '../../sizer/Sizer';
import RoundRecrangle from '../../../../plugins/roundrectangle';


export default Scrollable;

declare namespace Scrollable {

    type scrollModeTypes = 0 | 1 | 'v' | 'h' | 'vertical' | 'horizontal' | 'x' | 'y';
    type AlignTypes = 'left' | 'top' | 'right' | 'bottom' | 'center';
    type SliderInputTypes = 0 | 1 | -1 | 'drag' | 'pan' | 'click' | 'none';
    type SliderPositionTypes = 0 | 1 | 'right' | 'bottom' | 'left' | 'top'

    interface IConfig extends Sizer.IConfig {
        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            header?: number,
            footer?: number,
        },

        scrollMode?: scrollModeTypes,

        background?: Phaser.GameObjects.GameObject,

        slider?: (
            {
                background?: Phaser.GameObjects.GameObject | RoundRecrangle.IConfig,
                track?: Phaser.GameObjects.GameObject | RoundRecrangle.IConfig,
                thumb?: Phaser.GameObjects.GameObject | RoundRecrangle.IConfig,
                input?: SliderInputTypes,
                position?: SliderPositionTypes,

                hideUnscrollableSlider?: boolean,
                adaptThumbSize?: boolean,
                minThumbSize?: number,

                buttons?: {
                    top?: Phaser.GameObjects.GameObject,
                    bottom?: Phaser.GameObjects.GameObject,
                    left?: Phaser.GameObjects.GameObject,
                    right?: Phaser.GameObjects.GameObject,
                    step?: number
                }
            } |
            boolean
        ),

        scroller?: (
            {
                threshold?: number,
                slidingDeceleration?: number | false,
                backDeceleration?: number | false,
                dragRate?: number,
            } |
            boolean
        ),

        mouseWheelScroller?: (
            {
                focus?: boolean,
                speed?: number,
            } |
            boolean
        ),

        clamplChildOY?: boolean,

        header?: Phaser.GameObjects.GameObject,
        footer?: Phaser.GameObjects.GameObject,

        align?: {
            header?: AlignTypes,
            footer?: AlignTypes,
        },

        expand?: {
            header?: boolean,
            footer?: boolean,
        },
    }

}

declare class Scrollable extends Sizer {
    t: number;
    setT(value: number, clamp?: boolean): this;
    addT(inc: number, clamp?: boolean): this;
    scrollToTop(): this;
    scrollToBottom(): this;

    childOY: number;
    readonly topChildOY: number;
    readonly bottomChildOY: number;
    readonly childVisibleHeight: number;
    readonly childHeight: number;
    setChildOY(value: number, clamp?: boolean): this;
    addChildOY(inc: number, clamp?: boolean): this;

    sliderEnable: boolean;
    setSliderEnable(enable?: boolean): this;

    scrollerEnable: boolean;
    setScrollerEnable(enable?: boolean): this;

    mouseWheelScrollerEnable: boolean;
    setMouseWheelScrollerEnable(enable?: boolean): this;

    readonly scrollMode: number;
}