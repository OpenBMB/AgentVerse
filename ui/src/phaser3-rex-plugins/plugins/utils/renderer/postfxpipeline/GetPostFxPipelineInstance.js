var GetPostFxPipelineInstance = function (gameObject, PostFxPipelineClass, name) {    
    if (name === undefined) {
        var result = [];
        var pipelines = gameObject.postPipelines;
        for (var i = 0, cnt = pipelines.length; i < cnt; i++) {
            var instance = pipelines[i];
            if (instance instanceof PostFxPipelineClass) {
                result.push(instance)
            }
        }
        return result;
    } else {
        var pipelines = gameObject.postPipelines;
        for (var i = 0, cnt = pipelines.length; i < cnt; i++) {
            var instance = pipelines[i];
            if ((instance instanceof PostFxPipelineClass) && (instance.name === name)) {
                return instance;
            }
        }
    }
}

export default GetPostFxPipelineInstance;