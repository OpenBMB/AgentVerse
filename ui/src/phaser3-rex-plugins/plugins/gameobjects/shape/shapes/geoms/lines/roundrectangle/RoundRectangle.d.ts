import PathBase from "../PathBase";

export default RoundRectangle;

declare namespace RoundRectangle {
    interface IRadius {
        tl?: number,
        tr?: number,
        bl?: number,
        br?: number
    }
}

declare class RoundRectangle extends PathBase {
    constructor(
        x?: number, y?: number,
        width?: number, height?: number,
        radius?: number,
        iteration?: number
    );

    setTopLeftPosition(x: number, y: number): this;
    x: number;
    y: number;

    setSize(width: number, height: number): this;
    width: number;
    height: number;

    setCenterPosition(x: number, y: number): this;
    centerX: number;
    centerY: number;

    setRadius(radius: number | RoundRectangle.IRadius): this;
    radiusTL: number;
    radiusTR: number;
    radiusBL: number;
    radiusBR: number;

    setIterations(iterations: number): this;
    iterations: number;
}