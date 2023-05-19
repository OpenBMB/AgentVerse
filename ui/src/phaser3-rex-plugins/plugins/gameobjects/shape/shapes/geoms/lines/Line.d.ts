import PathBase from "./PathBase";

export default class Line extends PathBase {
    constructor(
        x0?: number, y0?: number,
        x1?: number, y1?: number
    );

    setP0(x: number, y: number): this;
    x0: number;
    y0: number;

    setP1(x: number, y: number): this;
    x1: number;
    y1: number;
}