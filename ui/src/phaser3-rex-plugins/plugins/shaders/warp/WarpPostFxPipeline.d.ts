// import * as Phaser from 'phaser';
export default WarpPostFxPipeline;

declare namespace WarpPostFxPipeline {
    interface IConfig {
        frequencyX?: number, frequencyY?: number,
        frequency?: number,

        amplitudeX?: number, amplitudeY?: number,
        amplitude?: number,

        speedX?: number, speedY?: number,
        speed?: number,
        speedEnable?: boolean
    }
}

declare class WarpPostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    resetFromJSON(
        config?: WarpPostFxPipeline.IConfig
    ): this;

    setFrequency(width: number, height?: number): this;
    setFrequencyX(value: number): this;
    setFrequencyY(value: number): this;
    frequencyX: number;
    frequencyY: number;
    frequency: number;

    setAmplitude(x: number, y?: number): this;
    setAmplitudeX(value: number): this;
    setAmplitudeY(value: number): this;
    amplitudeX: number;
    amplitudeY: number;
    amplitude: number;

    setSpeedX(value: number): this;
    setSpeedY(value: number): this;
    setSpeed(x: number, y?: number): this;
    speedX: number;
    speedY: number;
    speed: Phaser.Math.Vector2;
}