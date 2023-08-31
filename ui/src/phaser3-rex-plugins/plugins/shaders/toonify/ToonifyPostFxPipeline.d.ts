// import * as Phaser from 'phaser';

export default class ToonifyPostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    setEdgeThreshold(value: number): this;
    edgeThreshold: number;

    setHueLevels(value: number): this;
    hueLevels: number;

    setSatLevels(value: number): this;
    satLevels: number;

    setValLevels(value: number): this;
    valLevels: number;

    setEdgeColor(value: number | Phaser.Types.Display.ColorObject): this;
    edgeColor: Phaser.Display.Color;
}