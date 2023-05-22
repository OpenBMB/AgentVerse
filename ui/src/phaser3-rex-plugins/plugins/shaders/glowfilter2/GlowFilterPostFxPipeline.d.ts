// import * as Phaser from 'phaser';

export default GlowFilterPostFxPipeline;

declare namespace GlowFilterPostFxPipeline {
    interface IConfig {
        outerStrength?: number,
        innerStrength?: number,
        glowColor?: number,
        knockout?: boolean,
    }
}

declare class GlowFilterPostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    resetFromJSON(o?: GlowFilterPostFxPipeline.IConfig): this;

    setOuterStrength(value: number): this;
    outerStrength: number;

    setInnerStrength(value: number): this;
    innerStrength: number;

    setGlowColor(value: number | Phaser.Types.Display.ColorObject): this;
    glowColor: Phaser.Display.Color;

    setKnockout(value: boolean): this;
    knockout: boolean;

    static setQuality(quality: number): void;
    static getQuality(): number;

    static setDistance(distance: number): void;
    static getDistance(): number;
}