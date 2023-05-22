// import * as Phaser from 'phaser';
import HorrifiPostFxPipeline from './horrifipipeline';

export default HorrifiPipelinePlugin;

declare namespace HorrifiPipelinePlugin {

    interface IConfig extends HorrifiPostFxPipeline.IConfig {
        name?: string,
    }

}

declare class HorrifiPipelinePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: HorrifiPipelinePlugin.IConfig
    ): HorrifiPostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): HorrifiPostFxPipeline | HorrifiPostFxPipeline[];
}