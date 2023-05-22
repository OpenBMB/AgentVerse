// import * as Phaser from 'phaser';
import BaseGeom from './geoms/base/BaseGeom';

export default class BaseShapes extends Phaser.GameObjects.Shape {
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number
    );

    setSize(width: number, height: number): this;
    resize(width: number, height: number): this;
    width: number;
    height: number;
    isSizeChanged: boolean;

    setFillStyle(color: number, alpha: number): this;
    fillColor: number;
    fillAlpha: number;
    setStrokeStyle(lineWidth: number, color: number, alpha: number): this;
    lineWidth: number;
    strokeColor: number;
    strokeAlpha: number;

    setDirty(dirty?: boolean): this;
    dirty: boolean;

    updateShapes(): this;

    getShape(name: string): BaseGeom;
    getShapes(): BaseGeom[];
    addShape(shape: BaseGeom): this;
    deleteShape(name: string): this;
    clear(): this;
}