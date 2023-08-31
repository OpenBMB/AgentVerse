// import * as Phaser from 'phaser';
import GrayScalePostFxPipeline from './grayscalepipeline';

export default GrayScalePipelinePlugin;

declare namespace GrayScalePipelinePlugin {

    interface IConfig extends GrayScalePostFxPipeline.IConfig {
        name?: string,
    }

}

declare class GrayScalePipelinePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: GrayScalePipelinePlugin.IConfig
    ): GrayScalePostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): GrayScalePostFxPipeline | GrayScalePostFxPipeline[];
}