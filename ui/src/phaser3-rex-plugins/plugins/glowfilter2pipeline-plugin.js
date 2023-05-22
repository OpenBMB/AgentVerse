import GlowFilterPostFxPipeline from './glowfilter2pipeline.js';
import BasePostFxPipelinePlugin from './utils/renderer/postfxpipeline/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class GlowFilterPipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(GlowFilterPostFxPipeline, 'rexGlowFilter2PostFx');
    }

    add(gameObject, config) {
        this.setQuality(GetValue(config, 'quality', this.quality));
        this.setDistance(GetValue(config, 'distance', this.distance));
        return super.add(gameObject, config);
    }

    setQuality(value) {
        GlowFilterPostFxPipeline.setQuality(value);
        return this;
    }

    set quality(value) {
        this.setQuality(value);
    }

    get quality() {
        return GlowFilterPostFxPipeline.getQuality();
    }

    setDistance(value) {
        GlowFilterPostFxPipeline.setDistance(value);
        return this;
    }

    set distance(value) {
        this.setDistance(value);
    }

    get distance() {
        return GlowFilterPostFxPipeline.getDistance();
    }
}

SetValue(window, 'RexPlugins.Pipelines.GlowFilter2PostFx', GlowFilterPostFxPipeline);

export default GlowFilterPipelinePlugin;