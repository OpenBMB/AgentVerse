import ComponentBase from '../../utils/componentbase/ComponentBase';

export default Slider;

declare namespace Slider {
    type ValueChangeCallbackType = (newValue: number, oldValue: number) => void;

    interface IConfig {
        endPoints?: [
            { x: number, y: number },
            { x: number, y: number }
        ],
        value?: number,
        enable?: boolean,

        valuechangeCallback?: ValueChangeCallbackType,
        valuechangeCallbackScope?: Object
    }

    namespace Events {
        type ValueChangeCallbackType = (newValue: number, oldValue: number) => void;
    }
}

declare class Slider extends ComponentBase {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Slider.IConfig
    );

    setEnable(enable?: boolean): this;
    toggleEnable(): this;
    enable: boolean;

    setEndPoints(
        p0x: number, p0y: number,
        p1x: number, p1y: number
    ): this;

    setEndPoints(
        p0: { x: number, y: number },
        p1: { x: number, y: number }
    ): this;

    setEndPoints(
        points: [
            { x: number, y: number },
            { x: number, y: number }
        ]
    ): this;

    getValue(min?: number, max?: number): number;
    value: number;

    setValue(
        newValue: number,
        min?: number, max?: number
    ): this;

    addValue(
        inc: number,
        min?: number, max?: number
    ): this;

    readonly isDragging: boolean;
}