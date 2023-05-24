import InversePostFxPipeline from './inversepipeline.js';
import BasePostFxPipelinePlugin from './utils/renderer/postfxpipeline/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

class InversePipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(InversePostFxPipeline, 'rexInversePostFx');
    }
}

SetValue(window, 'RexPlugins.Pipelines.InversePostFx', InversePostFxPipeline);

export default InversePipelinePlugin;