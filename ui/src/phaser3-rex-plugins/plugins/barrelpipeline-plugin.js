import BarrelPostFxPipeline from './barrelpipeline';
import BasePostFxPipelinePlugin from './utils/renderer/postfxpipeline/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

class BarrelPipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(BarrelPostFxPipeline, 'rexBarrelPostFx');
    }
}

SetValue(window, 'RexPlugins.Pipelines.BarrelPostFx', BarrelPostFxPipeline);

export default BarrelPipelinePlugin;