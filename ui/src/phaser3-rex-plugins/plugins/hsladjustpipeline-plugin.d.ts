// import * as Phaser from 'phaser';
import HslAdjustPostFxPipeline from './hsladjustpipeline';


export default HslAdjustPipelinePlugin;

declare namespace HslAdjustPipelinePlugin {

    interface IConfig extends HslAdjustPostFxPipeline.IConfig {
        name?: string,
    }

}

declare class HslAdjustPipelinePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: HslAdjustPipelinePlugin.IConfig
    ): HslAdjustPostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): HslAdjustPostFxPipeline | HslAdjustPostFxPipeline[];
}