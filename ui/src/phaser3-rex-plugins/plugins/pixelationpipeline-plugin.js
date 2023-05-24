import PixelationPostFxPipeline from './pixelationpipeline.js';
import BasePostFxPipelinePlugin from './utils/renderer/postfxpipeline/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

class PixelationPipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(PixelationPostFxPipeline, 'rexPixelationPostFx');
    }
}

SetValue(window, 'RexPlugins.Pipelines.PixelationPostFx', PixelationPostFxPipeline);

export default PixelationPipelinePlugin;