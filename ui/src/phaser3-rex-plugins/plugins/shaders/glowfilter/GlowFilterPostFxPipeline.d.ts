// import * as Phaser from 'phaser';

export default GlowFilterPostFxPipeline;

declare namespace GlowFilterPostFxPipeline {
    interface IConfig {
        intensity?: number,
    }
}

declare class GlowFilterPostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    resetFromJSON(o?: GlowFilterPostFxPipeline.IConfig): this;

    setIntensity(value: number): this;
    intensity: number;
}