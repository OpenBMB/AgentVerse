// import * as Phaser from 'phaser';

export default class PixelationPostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    setPixelSize(width: number, height?: number): this;
    setPixelWidth(value: number): this;
    setPixelHeight(value: number): this;
    pixelWidth: number;
    pixelHeight: number;
    pixelSize: number;
}