// import * as Phaser from 'phaser';
import InversePostFxPipeline from './inversepipeline';


export default InversePipelinePlugin;

declare namespace InversePipelinePlugin {

    interface IConfig extends InversePostFxPipeline.IConfig {
        name?: string,
    }

}

declare class InversePipelinePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: InversePipelinePlugin.IConfig
    ): InversePostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): InversePostFxPipeline | InversePostFxPipeline[];
}