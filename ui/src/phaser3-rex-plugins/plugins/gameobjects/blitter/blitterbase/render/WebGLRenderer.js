const GetCalcMatrix = Phaser.GameObjects.GetCalcMatrix;

var WebGLRenderer = function (renderer, src, camera, parentMatrix) {
    var bobs = src.getRenderList();
    if (bobs.length === 0) {
        return;
    }

    camera.addToRenderList(src);

    var pipeline = renderer.pipelines.set(src.pipeline);

    var texture = src.frame.glTexture;

    var textureUnit = pipeline.setGameObject(src);

    var roundPixels = camera.roundPixels;

    var result = GetCalcMatrix(src, camera, parentMatrix);

    var calcMatrix = pipeline.calcMatrix.copyFrom(result.calc);

    var dx = src._displayOriginX;
    var dy = src._displayOriginY;

    var alpha = camera.alpha * src.alpha;

    renderer.pipelines.preBatch(src);

    for (var i = 0, cnt = bobs.length; i < cnt; i++) {
        bobs[i].webglRender(pipeline, calcMatrix, alpha, dx, dy, texture, textureUnit, roundPixels);
    }

    renderer.pipelines.postBatch(src);
};

export default WebGLRenderer;