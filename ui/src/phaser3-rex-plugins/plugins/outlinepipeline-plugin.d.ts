// import * as Phaser from 'phaser';
import OutlinePostFxPipeline from './outlinepipeline';


export default OutlinePipelinePlugin;

declare namespace OutlinePipelinePlugin {

    interface IConfig {
        thickness?: number,
        outlineColor?: number,
        quality?: number,

        name?: string,
    }

}

declare class OutlinePipelinePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: OutlinePipelinePlugin.IConfig
    ): OutlinePostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): OutlinePostFxPipeline | OutlinePostFxPipeline[];

    setQuality(value: number): this;
    quality: number;
}