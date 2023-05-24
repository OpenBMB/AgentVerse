import FillPathWebGL from '../../utils/render/FillPathWebGL.js';
import StrokePathWebGL from '../../utils/render/StrokePathWebGL.js';

const GetCalcMatrix = Phaser.GameObjects.GetCalcMatrix;

var PolygonWebGLRenderer = function (renderer, src, camera, parentMatrix) {    
    if (src.dirty) {
        src.updateData();
        src.dirty = false;
    }

    camera.addToRenderList(src);

    var pipeline = renderer.pipelines.set(src.pipeline);

    var result = GetCalcMatrix(src, camera, parentMatrix);

    var calcMatrix = pipeline.calcMatrix.copyFrom(result.calc);

    var dx = src._displayOriginX;
    var dy = src._displayOriginY;

    var alpha = camera.alpha * src.alpha;

    renderer.pipelines.preBatch(src);

    if (src.isFilled) {
        FillPathWebGL(pipeline, calcMatrix, src, alpha, dx, dy);
    }

    if (src.isStroked) {
        StrokePathWebGL(pipeline, src, alpha, dx, dy);
    }

    renderer.pipelines.postBatch(src);
};

export default PolygonWebGLRenderer;