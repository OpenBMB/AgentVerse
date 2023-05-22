// import * as Phaser from 'phaser';

export default KawaseBlurFilterPostFxPipeline;

declare namespace KawaseBlurFilterPostFxPipeline {
    interface IConfig {
        blur?: number,
        quality?: number,
        pixelWidth?: number,
        pixelHeight?: number
    }
}

declare class KawaseBlurFilterPostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    resetFromJSON(o?: KawaseBlurFilterPostFxPipeline.IConfig): this;

    setBlur(value: number): this;
    blur: number;

    setPixelSize(width: number, height?: number): this;
    setPixelWidth(value: number): this;
    setPixelHeight(value: number): this;
    pixelWidth: number;
    pixelHeight: number;
}