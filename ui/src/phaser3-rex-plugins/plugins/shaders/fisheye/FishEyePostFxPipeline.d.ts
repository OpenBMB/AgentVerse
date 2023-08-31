export default FishEyePostFxPipeline;

declare namespace FishEyePostFxPipeline {
    interface IConfig {
        mode?: 0 | 1 | 'asin' | 'sin',
        center?: {
            x?: number, y?: number
        },
        radius?: number,
        intensity?: number,

    }
}

declare class FishEyePostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    resetFromJSON(o?: FishEyePostFxPipeline.IConfig): this;

    setFishEyeMode(mode: number | string): this;
    fishEyeMode: number;

    setCenter(x: number, y?: number): this;
    centerX: number;
    centerY: number;

    setRadius(value: number): this;
    radius: number;

    setIntensity(value: number): this;
    intensity: number;
}