import GlowFilterPostFxPipeline from './glowfilterpipeline.js';
import BasePostFxPipelinePlugin from './utils/renderer/postfxpipeline/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

class GlowFilterPipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(GlowFilterPostFxPipeline, 'rexGlowFilterPostFx');
    }
}

SetValue(window, 'RexPlugins.Pipelines.GlowFilterPostFx', GlowFilterPostFxPipeline);

export default GlowFilterPipelinePlugin;