import BaseGeom from "../base/BaseGeom";

export default class Triangle extends BaseGeom {
    constructor(
        x0?: number, y0?: number,
        x1?: number, y1?: number,
        x2?: number, y2?: number
    );

    setP0(x: number, y: number): this;
    x0: number;
    y0: number;

    setP1(x: number, y: number): this;
    x1: number;
    y1: number;

    setP2(x: number, y: number): this;
    x2: number;
    y2: number;
}