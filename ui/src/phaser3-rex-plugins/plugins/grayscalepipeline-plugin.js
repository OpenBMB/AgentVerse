import GrayScalePostFxPipeline from './grayscalepipeline.js';
import BasePostFxPipelinePlugin from './utils/renderer/postfxpipeline/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

class GrayScalePipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(GrayScalePostFxPipeline, 'rexGrayScalePostFx');
    }
}

SetValue(window, 'RexPlugins.Pipelines.GrayScalePostFx', GrayScalePostFxPipeline);

export default GrayScalePipelinePlugin;