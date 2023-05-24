import GetGame from '../../system/GetGame.js';

var RegisterPostPipeline = function (game, postFxPipelineName, PostFxPipelineClass) {
    GetGame(game).renderer.pipelines.addPostPipeline(postFxPipelineName, PostFxPipelineClass);
}

export default RegisterPostPipeline;