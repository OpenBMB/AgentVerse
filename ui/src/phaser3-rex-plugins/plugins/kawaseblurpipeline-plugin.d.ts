// import * as Phaser from 'phaser';
import KawaseBlurFilterPostFxPipeline from './kawaseblurpipeline';


export default KawaseBlurFilterPipelinePlugin;

declare namespace KawaseBlurFilterPipelinePlugin {

    interface IConfig extends KawaseBlurFilterPostFxPipeline.IConfig {        
        name?: string,
    }

}

declare class KawaseBlurFilterPipelinePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject | Phaser.Cameras.Scene2D.Camera,
        config?: KawaseBlurFilterPipelinePlugin.IConfig
    ): KawaseBlurFilterPostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): KawaseBlurFilterPostFxPipeline | KawaseBlurFilterPostFxPipeline[];
}