import OutlinePostFxPipeline from './outlinepipeline.js';
import BasePostFxPipelinePlugin from './utils/renderer/postfxpipeline/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class OutlinePipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(OutlinePostFxPipeline, 'rexOutlinePostFx');
    }

    add(gameObject, config) {
        this.setQuality(GetValue(config, 'quality', this.quality));
        return super.add(gameObject, config);
    }

    setQuality(value) {
        OutlinePostFxPipeline.setQuality(value);
        return this;
    }

    set quality(value) {
        this.setQuality(value);
    }

    get quality() {
        return OutlinePostFxPipeline.getQuality();
    }
}

SetValue(window, 'RexPlugins.Pipelines.OutlinePostFx', OutlinePostFxPipeline);

export default OutlinePipelinePlugin;
