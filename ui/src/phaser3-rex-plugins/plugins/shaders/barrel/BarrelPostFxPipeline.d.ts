export default BarrelPostFxPipeline;

declare namespace BarrelPostFxPipeline {
    interface IConfig {
        shrink?: boolean,
        center?: {
            x?: number, y?: number
        },
        radius?: number,
        power?: number,
        intensity?: number,
    }
}

declare class BarrelPostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    resetFromJSON(o?: BarrelPostFxPipeline.IConfig): this;

    setShrinkMode(mode?: boolean): this;
    shrinkMode: boolean;

    setCenter(x: number, y?: number): this;
    centerX: number;
    centerY: number;

    setRadius(value: number): this;
    radius: number;

    setPower(power: number): this;
    power: this;

    setIntensity(value: number): this;
    intensity: number;
}