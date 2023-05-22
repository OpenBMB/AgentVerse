// import * as Phaser from 'phaser';

export default DissolvePostFxPipeline;

declare namespace DissolvePostFxPipeline {
    interface IConfig {
        toTexture?: string,
        toFrame?: string,
        resizeMode?: DissolvePostFxPipeline.ResizeModeType

        noiseX?: number,
        noiseY?: number,
        noiseZ?: number,
        fromEdgeStart?: number,
        fromEdgeWidth?: number,
        toEdgeStart?: number,
        toEdgeWidth?: number,

        progress?: number,
    }

    type ResizeModeType = 0 | 1 | 2 | 'stretch' | 'contain' | 'cover';

}

declare class DissolvePostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    resetFromJSON(o?: DissolvePostFxPipeline.IConfig): this;

    setProgress(value: number): this;
    progress: number;

    setNoise(x?: number, y?: number, z?: number): this;
    noiseX: number;
    noiseY: number;
    noiseZ: number;

    setTransitionTargetTexture(
        key?: string, frame?: string,
        resizeMode?: DissolvePostFxPipeline.ResizeModeType
    ): this

    setResizeMode(mode: DissolvePostFxPipeline.ResizeModeType): this;
    resizeMode: number;

    setFromEdge(edgeStart: number, edgeWidth: number): this;
    fromEdgeStart: number;
    edgeWidth: number;
    setToEdge(edgeStart: number, edgeWidth: number): this;
    toEdgeStart: number;
    toEdgeWidth: number;

}