// import * as Phaser from 'phaser';
import SwirlPostFxPipeline from './swirlpipeline';

export default SwirlPipelinePlugin;

declare namespace SwirlPipelinePlugin {

    interface IConfig {
        center?: {
            x?: number, y?: number
        },

        radius?: number,
        rotation?: number, angle?: number,

        name?: string
    }

}

declare class SwirlPipelinePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: SwirlPipelinePlugin.IConfig
    ): SwirlPostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): SwirlPostFxPipeline | SwirlPostFxPipeline[];
}