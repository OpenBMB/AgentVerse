// import * as Phaser from 'phaser';

export default ColorReplacePostFxPipeline;

declare namespace ColorReplacePostFxPipeline {
    interface IConfig {
        originalColor?: number,
        newColor?: number,
        epsilon?: number,
    }
}

declare class ColorReplacePostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    resetFromJSON(o?: ColorReplacePostFxPipeline.IConfig): this;

    setEpsilon(value: number): this;
    epsilon: number;

    setOriginalColor(value: number | Phaser.Types.Display.ColorObject): this;
    originalColor: Phaser.Display.Color;

    setNewColor(value: number | Phaser.Types.Display.ColorObject): this;
    newColor: Phaser.Display.Color;
}