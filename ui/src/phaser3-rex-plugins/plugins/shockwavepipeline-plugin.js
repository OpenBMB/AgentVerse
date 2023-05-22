import ShockwavePostFxPipeline from './shockwavepipeline.js';
import BasePostFxPipelinePlugin from './utils/renderer/postfxpipeline/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

class ShockwavePipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(ShockwavePostFxPipeline, 'rexShockwavePostFx');
    }
}

SetValue(window, 'RexPlugins.Pipelines.ShockwavePostFx', ShockwavePostFxPipeline);

export default ShockwavePipelinePlugin;