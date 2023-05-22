const SpliceOne = Phaser.Utils.Array.SpliceOne;

var RemovePostFxPipelineInstance = function(gameObject, PostFxPipelineClass, name) {    
    if (name === undefined) {
        var pipelines = gameObject.postPipelines;
        for (var i = (pipelines.length - 1); i >= 0; i--) {
            var instance = pipelines[i];
            if (instance instanceof PostFxPipelineClass) {
                instance.destroy();
                SpliceOne(pipelines, i);
            }
        }
    } else {
        var pipelines = gameObject.postPipelines;
        for (var i = 0, cnt = pipelines.length; i < cnt; i++) {
            var instance = pipelines[i];
            if ((instance instanceof PostFxPipelineClass) && (instance.name === name)) {
                instance.destroy();
                SpliceOne(pipelines, i);
            }
        }
    }
}

export default RemovePostFxPipelineInstance;