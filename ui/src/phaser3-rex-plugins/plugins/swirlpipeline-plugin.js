import SwirlPostFxPipeline from './swirlpipeline.js';
import BasePostFxPipelinePlugin from './utils/renderer/postfxpipeline/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

class SwirlPipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(SwirlPostFxPipeline, 'rexSwirlPostFx');
    }
}

SetValue(window, 'RexPlugins.Pipelines.SwirlPostFx', SwirlPostFxPipeline);

export default SwirlPipelinePlugin;