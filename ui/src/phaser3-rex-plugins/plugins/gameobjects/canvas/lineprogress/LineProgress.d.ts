import Canvas from '../canvas/Canvas';

// import * as Phaser from 'phaser';
export default LineProgress;

declare namespace LineProgress {

    type ValueChangeCallbackType = (
        newValue: number,
        oldValue: number,
        circularProgress: LineProgress
    ) => void;

    interface IConfig {
        x?: number, y?: number,
        width?: number, height?: number,

        trackColor?: string | number,
        trackThickness?: number,
        trackStrokeColor?: string | number,
        barColor?: string | number,
        barColor2?: string | number,
        isHorizontalGradient?: boolean,

        skewX?: number,

        rtl?: boolean,

        value?: number,

        easeValue?: {
            duration?: number,
            ease?: string
        },

        valuechangeCallback: ValueChangeCallbackType,
    }

    namespace Events {
        type ValueChangeCallbackType = (
            newValue: number,
            oldValue: number,
            circularProgress: LineProgress
        ) => void;
    }
}

declare class LineProgress extends Canvas {
    constructor(
        scene: Phaser.Scene,
        config?: LineProgress.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number,
        config?: LineProgress.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number,
        barColor?: string | number,
        value?: number,
        config?: LineProgress.IConfig
    );

    value: number;
    getValue(min?: number, max?: number): number;
    setValue(value?: number, min?: number, max?: number): this;
    addValue(inc?: number, min?: number, max?: number): this;

    easeValueTo(value?: number, min?: number, max?: number): this;
    stopEaseValue(): this;
    setEaseValueDuration(duration: number): this;
    setEaseValueFunction(ease: string): this;

    trackColor: string;
    setTrackColor(radius?: string | number): this;

    trackStrokeThickness: number;
    trackStrokeColor: string;
    setTrackStroke(
        lineWidth?: number,
        color?: string | number
    ): this;

    barColor: string;
    barColor2: string;
    isHorizontalGradient: boolean;
    setBarColor(
        barColor?: string | number,
        barColor2?: string | number,
        isHorizontalGradient?: boolean,
    ): this;

    skewX: number;
    setSkewX(skewX: number): this;

    rtl: boolean;
    setRTL(enable?: boolean): this;
}