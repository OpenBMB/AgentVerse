// import * as Phaser from 'phaser';
import ToonifyPostFxPipeline from './toonifypipeline';

export default ToonifyPipelinePlugin;

declare namespace ToonifyPipelinePlugin {

    interface IConfig {
        edgeThreshold?: number,
        hueLevels?: number,
        sLevels?: number,
        vLevels?: number,
        edgeColor?: number,

        name?: string,
    }

}

declare class ToonifyPipelinePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: ToonifyPipelinePlugin.IConfig
    ): ToonifyPostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): ToonifyPostFxPipeline | ToonifyPostFxPipeline[];
}