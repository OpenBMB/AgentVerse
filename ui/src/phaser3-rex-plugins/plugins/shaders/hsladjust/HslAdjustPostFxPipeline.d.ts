// import * as Phaser from 'phaser';
export default HslAdjustPostFxPipeline;

declare namespace HslAdjustPostFxPipeline {
    interface IConfig {
        hueRotate?: number,
        satAdjust?: number,
        lumAdjust?: number
    }
}

declare class HslAdjustPostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    resetFromJSON(o?: HslAdjustPostFxPipeline.IConfig): this;

    setHueRotate(value: number): this;
    hueRotate: number;

    setSatAdjust(value: number): this;
    satAdjust: number;

    setLumAdjust(value: number): this;
    lumAdjust: number;
}