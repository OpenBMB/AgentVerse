// import * as Phaser from 'phaser';
import SplitPostFxPipeline from './splitpipeline';

export default SplitPipelinePlugin;

declare namespace SplitPipelinePlugin {

    interface IConfig {
        x?: number, y?: number,

        width?: number, height?: number,
        left?: number, right?: number, top?: number, bottom?: number,

        shiftEnable?: boolean,

        name?: string
    }

}

declare class SplitPipelinePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: SplitPipelinePlugin.IConfig
    ): SplitPostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): SplitPostFxPipeline | SplitPostFxPipeline[];
}