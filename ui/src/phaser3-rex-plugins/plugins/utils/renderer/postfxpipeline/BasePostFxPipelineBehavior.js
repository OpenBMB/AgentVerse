const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;
const RemoveIte = Phaser.Utils.Array.Remove;

class PostFxPipelineBehaviorBase {
    constructor(gameObject, config) {
        this.gameObject = gameObject;
        this.scene = gameObject.scene;

        // Can inject PipelineClass at runtime
        var PipelineClass;
        if (IsPostFxPipelineClass(config)) {
            PipelineClass = config;
            config = undefined;
        } else {
            PipelineClass = GetValue(config, 'PipelineClass');
        }
        if (PipelineClass) {
            this.createPipeline = function (game) {
                return new PipelineClass(game);
            }
        }

        var enable = GetValue(config, 'enable', !!config)

        if (enable) {
            this.getPipeline(config);
        }

        // Will destroy pipeline when gameObject destroying
    }

    getPipeline(config) {
        if (!this.pipeline) {
            var pipeline = this.createPipeline(this.scene.game);
            var gameObject = this.gameObject;
            var postPipelines = gameObject.postPipelines;
            pipeline.gameObject = gameObject;
            postPipelines.push(pipeline);
            gameObject.hasPostPipeline = (postPipelines.length > 0);

            this.pipeline = pipeline;
        }
        if (config && this.pipeline.resetFromJSON) {
            this.pipeline.resetFromJSON(config);
        }
        return this.pipeline;
    }

    freePipeline() {
        if (!this.pipeline) {
            return this;
        }

        var gameObject = this.gameObject;
        var postPipelines = gameObject.postPipelines;
        RemoveIte(postPipelines, this.pipeline);
        gameObject.hasPostPipeline = (postPipelines.length > 0);

        this.pipeline.destroy();
        this.pipeline = undefined;
        return this;
    }

    // Override
    createPipeline(game) {

    }
}

var IsPostFxPipelineClass = function (object) {
    return object && object.prototype &&
        (object.prototype instanceof PostFXPipeline);
}

export default PostFxPipelineBehaviorBase;