// import * as Phaser from 'phaser';
export default InversePostFxPipeline;

declare namespace InversePostFxPipeline {
    interface IConfig {
        intensity?: number,
    }
}

declare class InversePostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    resetFromJSON(o?: InversePostFxPipeline.IConfig): this;

    setIntensity(value: number): this;
    intensity: number;
}