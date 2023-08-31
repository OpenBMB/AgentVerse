import CrossStitchingPostFxPipeline from './crossstitchingpipeline.js';
import BasePostFxPipelinePlugin from './utils/renderer/postfxpipeline/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

class CrossStitchingPipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(CrossStitchingPostFxPipeline, 'rexCrossStitchingPostFx');
    }
}

SetValue(window, 'RexPlugins.Pipelines.CrossStitchingPostFx', CrossStitchingPostFxPipeline);

export default CrossStitchingPipelinePlugin;