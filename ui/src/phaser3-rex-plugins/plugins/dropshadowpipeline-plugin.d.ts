// import * as Phaser from 'phaser';
import DropShadowPostFxPipeline from './dropshadowpipeline';


export default DropShadowPipelinePlugin;

declare namespace DropShadowPipelinePlugin {

    interface IConfig extends DropShadowPostFxPipeline.IConfig {
        name?: string,
    }

}

declare class DropShadowPipelinePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: DropShadowPipelinePlugin.IConfig
    ): DropShadowPostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): DropShadowPostFxPipeline | DropShadowPostFxPipeline[];
}