// import * as Phaser from 'phaser';

export default class OutlinePostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    setThickness(value: number): this;
    thickness: number;

    setOutlineColor(value: number | Phaser.Types.Display.ColorObject): this;
    outlineColor: Phaser.Display.Color;

    static setQuality(quality: number): void;
    static getQuality(): number;
}