// import * as Phaser from 'phaser';
import PixelationPostFxPipeline from './pixelationpipeline';

export default PixelationPipelinePlugin;

declare namespace PixelationPipelinePlugin {

    interface IConfig {
        pixelWidth?: number,
        pixelHeight?: number,

        name?: string,
    }

}

declare class PixelationPipelinePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: PixelationPipelinePlugin.IConfig
    ): PixelationPostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): PixelationPostFxPipeline | PixelationPostFxPipeline[];
}