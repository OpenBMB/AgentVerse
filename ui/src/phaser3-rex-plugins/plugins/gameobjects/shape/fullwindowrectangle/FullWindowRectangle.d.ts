// import * as Phaser from 'phaser';

export default FullWindowRectangle;

declare class FullWindowRectangle extends Phaser.GameObjects.Rectangle {
    constructor(
        scene: Phaser.Scene,
        fillColor?: number,
        fillAlpha?: number
    );

    alpha: number;
    tint: number;
}