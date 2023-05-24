import CustomShapes from '../customshapes/CustomShapes';

export default CustomProgress;

declare namespace CustomProgress {
    type Arc = CustomShapes.Arc;
    type Circle = CustomShapes.Circle;
    type Curve = CustomShapes.Curve;
    type Ellipse = CustomShapes.Ellipse;
    type Line = CustomShapes.Line;
    type Lines = CustomShapes.Lines;
    type Rectangle = CustomShapes.Rectangle;
    type RoundRectangle = CustomShapes.RoundRectangle;
    type Triangle = CustomShapes.Triangle;
    type ShapeTypes = Arc | Circle | Curve | Ellipse |
        Line | Lines | Rectangle | RoundRectangle | Triangle;

    type ValueChangeCallbackType = (
        newValue: number,
        oldValue: number,
        customProgress: CustomProgress
    ) => void;

    interface IConfig extends Omit<CustomShapes.IConfig, 'update'> {
        value?: number,

        update?: (this: CustomProgress) => void;

        easeValue?: {
            duration?: number,
            ease?: string
        },

        valuechangeCallback?: ValueChangeCallbackType,
    }

    namespace Events {
        type ValueChangeCallbackType = (
            newValue: number,
            oldValue: number,
            customProgress: CustomProgress
        ) => void;
    }
}

declare class CustomProgress extends CustomShapes {
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number,
        config?: CustomProgress.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        config?: CustomProgress.IConfig
    );

    readonly centerX: number;
    readonly centerY: number;
    readonly radius: number;

    value: number;
    getValue(min?: number, max?: number): number;
    setValue(value?: number, min?: number, max?: number): this;
    addValue(inc?: number, min?: number, max?: number): this;

    easeValueTo(value?: number, min?: number, max?: number): this;
    stopEaseValue(): this;
    setEaseValueDuration(duration: number): this;
    setEaseValueFunction(ease: string): this;
}