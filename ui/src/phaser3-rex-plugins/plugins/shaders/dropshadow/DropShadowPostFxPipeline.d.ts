// import * as Phaser from 'phaser';

export default DropShadowPostFxPipeline;

declare namespace DropShadowPostFxPipeline {
    interface IConfig {
        rotation?: number,
        angle?: number,
        distance?: number,
        shadowColor?: number,
        alpha?: number,
        shadowOnly?: boolean,
        blur?: number | number[],
        quality?: number,
        pixelWidth?: number,
        pixelHeight?: number,
    }
}

declare class DropShadowPostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    resetFromJSON(o?: DropShadowPostFxPipeline.IConfig): this;

    setRotation(value: number): this;
    setAngle(value: number): this;
    rotation: number;
    angle: number;

    setDistance(value: number): this;
    distance: number;

    setShadowColor(value: number): this;
    shadowColor: number;

    setAlpha(value: number): this;
    alpha: number;

    setShadowOnly(enable?: boolean): this;
    shadowOnly: boolean;

    setBlur(value: number): this;
    blur: number;

    setQuality(value: number): this;
    quality: number;

    setKernela(value: number): this;
    kernels: number;

    setPixelWidth(value: number): this;
    setPixelHeight(value: number): this;
    setPixelSize(width: number, height: number): this;
    pixelWidth: number;
    pixelHeight: number;
}