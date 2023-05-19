import KawaseBlurFilterPostFxPipeline from './kawaseblurpipeline.js';
import BasePostFxPipelinePlugin from './utils/renderer/postfxpipeline/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class KawaseBlurFilterPipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(KawaseBlurFilterPostFxPipeline, 'rexKawaseBlurFilterPostFx');
    }
}

SetValue(window, 'RexPlugins.Pipelines.KawaseBlurFilterPostFx', KawaseBlurFilterPostFxPipeline);

export default KawaseBlurFilterPipelinePlugin;