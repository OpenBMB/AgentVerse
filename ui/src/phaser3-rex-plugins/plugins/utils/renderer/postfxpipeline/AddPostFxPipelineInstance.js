var AddPostFxPipelineInstance = function (gameObject, PostFxPipelineClass, config) {
    if (config === undefined) {
        config = {};
    }

    gameObject.setPostPipeline(PostFxPipelineClass);
    var pipeline = gameObject.postPipelines[gameObject.postPipelines.length - 1];
    pipeline.resetFromJSON(config);

    if (config.name) {
        pipeline.name = config.name;
    }

    return pipeline;
}

export default AddPostFxPipelineInstance;