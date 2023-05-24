import ToonifyPostFxPipeline from './toonifypipeline.js';
import BasePostFxPipelinePlugin from './utils/renderer/postfxpipeline/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

class ToonifyPipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(ToonifyPostFxPipeline, 'rexToonifyPostFx');
    }
}

SetValue(window, 'RexPlugins.Pipelines.ToonifyPostFx', ToonifyPostFxPipeline);

export default ToonifyPipelinePlugin;