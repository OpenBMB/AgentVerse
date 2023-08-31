// import * as Phaser from 'phaser';
import ShockwavePostFxPipeline from './shockwavepipeline';


export default ShockwavePipelinePlugin;

declare namespace ShockwavePipelinePlugin {

    interface IConfig {
        center?: { x?: number, y?: number },
        waveRadius?: number,
        waveWidth?: number,
        powBaseScale?: number,
        powExponent?: number,

        name?: string,
    }

}

declare class ShockwavePipelinePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: ShockwavePipelinePlugin.IConfig
    ): ShockwavePostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): ShockwavePostFxPipeline | ShockwavePostFxPipeline[];
}