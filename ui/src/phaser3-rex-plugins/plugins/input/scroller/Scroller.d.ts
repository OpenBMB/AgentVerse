import ComponentBase from '../../utils/componentbase/ComponentBase';

export default Scroller;

declare namespace Scroller {

    type OrientationType = 0 | 1 | 'x' | 'y' | 'v' | 'vertical' | 'h' | 'horizontal';
    type ValueChangeCallbackType = (newValue: number, oldValue: number) => void;

    interface IConfig {
        bounds?: [
            bottomBound: number,
            topBound: number
        ],
        value?: number,
        threshold?: number,
        slidingDeceleration?: number,
        backDeceleration?: number,

        dragReverse?: boolean,
        dragRate?: number,

        enable?: boolean,
        orientation?: OrientationType,

        valuechangeCallback?: ValueChangeCallbackType,
        valuechangeCallbackScope?: Object,

        overmaxCallback?: ValueChangeCallbackType,
        overmaxCallbackScope?: Object,

        overminCallback?: ValueChangeCallbackType,
        overminCallbackScope?: Object,
    }

    namespace Events {
        type ValueChageCallbackType = (newValue: number, oldValue: number) => void;
    }
}

declare class Scroller extends ComponentBase {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Scroller.IConfig
    )

    setEnable(enable?: boolean): this;
    toggleEnable(): this;
    enable: boolean;

    setBounds(bound0: number, bound1: number): this;
    setBounds(bounds: [bottomBound: number, topBound: number]): this;

    setSlidingDeceleration(dec: number | false): this;
    setBackDeceleration(dec: number | false): this;

    setValue(value: number, clamp?: boolean): this;
    addValue(inc: number, clamp?: boolean): this;
    value: number;

    readonly isDragging: boolean;

    readonly state: string;
}