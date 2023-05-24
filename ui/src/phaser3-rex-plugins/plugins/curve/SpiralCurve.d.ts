export default SpiralCurve;

declare namespace SpiralCurve {
    interface IConfig {
        // Origin point
        // Ease origin point
        startX?: number, endX?: number, easeX?: string,
        startY?: number, endY?: number, easeY?: string,
        // Fixed point
        x?: number, y?: number,

        // x-radius
        startXRadius?: number, endXRadius?: number, easeXRadius?: string,
        // y-radius
        startYRadiu?: number, endYRadius?: number, easeYRadius?: string,
        // start-end radius
        startRadius?: number, endRadiux?: number

        // angle
        startAngle?: number, endAngle?: number, easeAngle?: string,

        rotation?: number
    }
}

declare class SpiralCurve extends Phaser.Curves.Curve {
    constructor(
        config?: SpiralCurve.IConfig
    );

    constructor(
        x?: number, y?: number,
        startRadius?: number, endRadius?: number,
        startAngle?: number, endAngle?: number,
        rotation?: number
    );

    setStartX(x: number): this;
    setStartY(x: number): this;
    startX: number;
    startY: number;
    readonly p0: { x: number, y: number };

    setEndX(x: number): this;
    setEndY(x: number): this;
    endX: number;
    endY: number;
    readonly p1: { x: number, y: number };

    setStartXRadius(radius: number): this;
    setStartYRadius(radius: number): this;
    startXRadius: number;
    startYRadius: number;
    setEndXRadius(radius: number): this;
    setEndYRadius(radius: number): this;
    endXRadius: number;
    endYRadius: number;

    setStartAngle(degrees: number): this;
    setEndAngle(degrees: number): this;
    startAngle: number;
    endAngle: number;
}