import BasePostFxPipelineBehavior from '../../utils/renderer/postfxpipeline/BasePostFxPipelineBehavior.js';
import WarpPostFxPipeline from './WarpPostFxPipeline.js';

class WarpPostFxPipelineBehavior extends BasePostFxPipelineBehavior {
    createPipeline(game) {
        return new WarpPostFxPipeline(game);
    }
}

export default WarpPostFxPipelineBehavior;