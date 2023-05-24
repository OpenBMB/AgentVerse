import BasePostFxPipelineBehavior from '../../utils/renderer/postfxpipeline/BasePostFxPipelineBehavior';
import WarpPostFxPipeline from './WarpPostFxPipeline';

export default WarpPostFxPipelineBehavior;

declare namespace WarpPostFxPipelineBehavior {
    interface IConfig extends WarpPostFxPipeline.IConfig {

    }
}

declare class WarpPostFxPipelineBehavior extends BasePostFxPipelineBehavior {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: WarpPostFxPipelineBehavior.IConfig
    );

    getPipeline(
        config?: WarpPostFxPipelineBehavior.IConfig
    ): WarpPostFxPipeline;
}