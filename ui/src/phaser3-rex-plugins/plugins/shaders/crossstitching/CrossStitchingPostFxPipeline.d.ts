// import * as Phaser from 'phaser';
export default CrossStitchingPostFxPipeline;

declare namespace CrossStitchingPostFxPipeline {
    interface IConfig {
        stitchingWidth?: number,
        stitchingHeight?: number,
        brightness?: number,
    }
}

declare class CrossStitchingPostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    resetFromJSON(o?: CrossStitchingPostFxPipeline.IConfig): this;

    setStitchingWidth(value: number): this;
    stitchingWidth: number;
    setStitchingHeight(value: number): this;
    setStitchingSize(width: number, height?: number): this;
    stitchingHeight: number;

    setBrightness(value: number): this;
    brightness: number;
}