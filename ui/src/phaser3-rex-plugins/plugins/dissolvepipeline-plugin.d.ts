// import * as Phaser from 'phaser';
import DissolvePostFxPipeline from './dissolvepipeline';

export default DissolvePipelinePlugin;

declare namespace DissolvePipelinePlugin {

    interface IConfig extends DissolvePostFxPipeline.IConfig {
        name?: string,
    }

}

declare class DissolvePipelinePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: DissolvePipelinePlugin.IConfig
    ): DissolvePostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): DissolvePostFxPipeline | DissolvePostFxPipeline[];
}