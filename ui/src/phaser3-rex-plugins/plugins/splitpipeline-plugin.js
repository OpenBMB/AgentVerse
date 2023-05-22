import SplitPostFxPipeline from './splitpipeline.js';
import BasePostFxPipelinePlugin from './utils/renderer/postfxpipeline/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

class SplitPipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(SplitPostFxPipeline, 'rexSplitPostFx');
    }
}

SetValue(window, 'RexPlugins.Pipelines.SplitPostFx', SplitPostFxPipeline);

export default SplitPipelinePlugin;