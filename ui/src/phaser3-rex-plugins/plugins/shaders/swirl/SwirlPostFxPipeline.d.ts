// import * as Phaser from 'phaser';

export default class SwirlPostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    setCenter(x: number, y?: number): this;
    centerX: number;
    centerY: number;

    setRotation(radians: number): this;
    rotation: number;
    setAngle(degrees: number): this;
    angle: number;

    setRadius(value: number): this;
    radius: number;
}