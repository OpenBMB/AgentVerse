import BasePostFxPipelineBehavior from '../../utils/renderer/postfxpipeline/BasePostFxPipelineBehavior';
import HorrifiPostFxPipeline from './HorrifiPostFxPipeline';

export default HorrifiPostFxPipelineBehavior;

declare namespace HorrifiPostFxPipelineBehavior {
    interface IConfig extends HorrifiPostFxPipeline.IConfig {

    }
}

declare class HorrifiPostFxPipelineBehavior extends BasePostFxPipelineBehavior {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: HorrifiPostFxPipelineBehavior.IConfig
    );

    getPipeline(
        config?: HorrifiPostFxPipelineBehavior.IConfig
    ): HorrifiPostFxPipeline;
}