// const Utils = Phaser.Renderer.WebGL.Utils;
const GetCalcMatrix = Phaser.GameObjects.GetCalcMatrix;

var WebGLRenderer = function (renderer, src, camera, parentMatrix) {
    if (renderer.newType) {
        renderer.pipelines.clear();
    }

    camera.addToRenderList(src);

    var calcMatrix = GetCalcMatrix(src, camera, parentMatrix).calc;

    src.model.draw(calcMatrix);

    if (!renderer.nextTypeMatch) {
        renderer.pipelines.rebind();
    }
};

export default WebGLRenderer;