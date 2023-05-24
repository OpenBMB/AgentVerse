// import * as Phaser from 'phaser';

export default class ShockwavePostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    setCenter(x?: number, y?: number): this;
    centerX: number;
    centerY: number;

    setWaveRadius(value: number): this;
    waveRadius: number;

    setWaveWidth(value: number): this;
    waveWidth: number;

    setPowBaseScale(value: number): this;
    powBaseScale: number;

    setPowExponent(value: number): this;
    powExponent: number;

}