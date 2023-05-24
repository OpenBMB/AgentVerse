import PathBase from "../PathBase";

export default class Arc extends PathBase {
    constructor(
        x?: number, y?: number,
        radiusX?: number, radiusY?: number,
        startAngle?: number, endAngle?: number,
        anticlockwise?: boolean, pie?: boolean
    );

    setCenterPosition(x: number, y: number): this;
    x: number;
    y: number;

    setRadius(radiusX: number, radiusY?: number): this;
    radiusX: number;
    radiusY: number;

    setAngle(
        startAngle: number, endAngle: number,
        anticlockwise?: boolean
    ): this;
    startAngle: number;
    endAngle: number;
    anticlockwise: boolean;

    setPie(pie: boolean): this;
    pie: boolean;

    setIterations(iterations:number):this;
    iterations:number;
}