import HslAdjustPostFxPipeline from './hsladjustpipeline.js';
import BasePostFxPipelinePlugin from './utils/renderer/postfxpipeline/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

class HslAdjustPipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(HslAdjustPostFxPipeline, 'rexHslAdjustPostFx');
    }
}

SetValue(window, 'RexPlugins.Pipelines.HslAdjustPostFx', HslAdjustPostFxPipeline);

export default HslAdjustPipelinePlugin;