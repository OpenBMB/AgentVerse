import BasePostFxPipelineBehavior from '../../utils/renderer/postfxpipeline/BasePostFxPipelineBehavior.js';
import HorrifiPostFxPipeline from './HorrifiPostFxPipeline.js';

class HorrifiPostFxPipelineBehavior extends BasePostFxPipelineBehavior {
    createPipeline(game) {
        return new HorrifiPostFxPipeline(game);
    }
}

export default HorrifiPostFxPipelineBehavior;