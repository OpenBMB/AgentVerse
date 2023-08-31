// import * as Phaser from 'phaser';
import GlowFilterPostFxPipeline from './glowfilter2pipeline';

export default GlowFilterPipelinePlugin;

declare namespace GlowFilterPipelinePlugin {

    interface IConfig extends GlowFilterPostFxPipeline.IConfig {
        quality?: number,
        distance?: number,

        name?: string,
    }

}

declare class GlowFilterPipelinePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: GlowFilterPipelinePlugin.IConfig
    ): GlowFilterPostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): GlowFilterPostFxPipeline | GlowFilterPostFxPipeline[];

    setQuality(value: number): this;
    quality: number;

    setDistance(value: number): this;
    distance: number;
}