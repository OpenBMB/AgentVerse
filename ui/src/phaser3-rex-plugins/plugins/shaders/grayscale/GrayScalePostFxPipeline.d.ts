// import * as Phaser from 'phaser';

export default GrayScalePostFxPipeline;

declare namespace GrayScalePostFxPipeline {
    interface IConfig {
        intensity?: number,
    }
}

declare class GrayScalePostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    resetFromJSON(o?: GrayScalePostFxPipeline.IConfig): this;

    setIntensity(value: number): this;
    intensity: number;
}