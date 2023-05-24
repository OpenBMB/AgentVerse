import DissolvePostFxPipeline from './dissolvepipeline.js';
import BasePostFxPipelinePlugin from './utils/renderer/postfxpipeline/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

class DissolvePipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(DissolvePostFxPipeline, 'rexDissolvePostFx');
    }
}

SetValue(window, 'RexPlugins.Pipelines.DissolvePostFx', DissolvePostFxPipeline);

export default DissolvePipelinePlugin;