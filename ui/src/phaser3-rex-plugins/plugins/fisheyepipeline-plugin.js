import FishEyePostFxPipeline from './fisheyepipeline';
import BasePostFxPipelinePlugin from './utils/renderer/postfxpipeline/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

class FishEyePipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(FishEyePostFxPipeline, 'rexFishEyePostFx');
    }
}

SetValue(window, 'RexPlugins.Pipelines.FishEyePostFx', FishEyePostFxPipeline);

export default FishEyePipelinePlugin;