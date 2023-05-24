// import * as Phaser from 'phaser';
import CrossStitchingPostFxPipeline from './crossstitchingpipeline';


export default CrossStitchingPipelinePlugin;

declare namespace CrossStitchingPipelinePlugin {

    interface IConfig extends CrossStitchingPostFxPipeline.IConfig {
        name?: string,
    }

}

declare class CrossStitchingPipelinePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: CrossStitchingPipelinePlugin.IConfig
    ): CrossStitchingPostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): CrossStitchingPostFxPipeline | CrossStitchingPostFxPipeline[];
}