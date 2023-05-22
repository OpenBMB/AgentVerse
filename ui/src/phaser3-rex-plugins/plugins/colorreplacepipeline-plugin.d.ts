// import * as Phaser from 'phaser';
import ColorReplacePostFxPipeline from './colorreplacepipeline';


export default ColorReplacePipelinePlugin;

declare namespace ColorReplacePipelinePlugin {

    interface IConfig extends ColorReplacePostFxPipeline.IConfig {
        name?: string,
    }

}

declare class ColorReplacePipelinePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: ColorReplacePipelinePlugin.IConfig
    ): ColorReplacePostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): ColorReplacePostFxPipeline | ColorReplacePostFxPipeline[];
}