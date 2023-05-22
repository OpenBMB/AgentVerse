// import * as Phaser from 'phaser';
import FishEyePostFxPipeline from './fisheyepipeline';

export default FishEyePipelinePlugin;

declare namespace FishEyePipelinePlugin {

    interface IConfig extends FishEyePostFxPipeline.IConfig {
        name?: string
    }

}

declare class FishEyePipelinePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: FishEyePipelinePlugin.IConfig
    ): FishEyePostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): FishEyePostFxPipeline | FishEyePostFxPipeline[];
}