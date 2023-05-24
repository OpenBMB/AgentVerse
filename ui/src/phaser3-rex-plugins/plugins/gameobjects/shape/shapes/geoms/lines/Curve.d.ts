// import * as Phaser from 'phaser';
import PathBase from "./PathBase";

export default class Curve extends PathBase {
    constructor(
        curve: Phaser.Curves.Curve
    );

    setCurve(curve: Phaser.Curves.Curve): this;
    curve: Phaser.Curves.Curve;

    setIterations(iterations: number): this;
    iterations: number;

}