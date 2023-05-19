import BaseGeom from "../base/BaseGeom";

export default class Rectangle extends BaseGeom {
    constructor(
        x?: number, y?: number,
        width?: number, height?: number
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

}