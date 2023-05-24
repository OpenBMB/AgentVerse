import ColorReplacePostFxPipeline from './colorreplacepipeline.js';
import BasePostFxPipelinePlugin from './utils/renderer/postfxpipeline/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

class ColorReplacePipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(ColorReplacePostFxPipeline, 'rexColorReplacePostFx');
    }
}

SetValue(window, 'RexPlugins.Pipelines.ColorReplacePostFx', ColorReplacePostFxPipeline);

export default ColorReplacePipelinePlugin;
