// import * as Phaser from 'phaser';
import WarpPostFxPipeline from './warppipeline';

export default WarpPipelinePlugin;

declare namespace WarpPipelinePlugin {

    interface IConfig extends WarpPostFxPipeline.IConfig {
        name?: string,
    }

}

declare class WarpPipelinePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: WarpPipelinePlugin.IConfig
    ): WarpPostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): WarpPostFxPipeline | WarpPostFxPipeline[];
}