import FillStyleCanvas from '../../utils/render/FillStyleCanvas';
import LineStyleCanvas from '../../utils/render/LineStyleCanvas';

const SetTransform = Phaser.Renderer.Canvas.SetTransform;

var PolygonCanvasRenderer = function (renderer, src, camera, parentMatrix) {
    if (src.dirty) {
        src.updateData();
        src.dirty = false;
    }

    camera.addToRenderList(src);

    var ctx = renderer.currentContext;

    if (SetTransform(renderer, ctx, src, camera, parentMatrix)) {
        var dx = src._displayOriginX;
        var dy = src._displayOriginY;

        var path = src.pathData;
        var pathLength = path.length - 1;

        var px1 = path[0] - dx;
        var py1 = path[1] - dy;

        ctx.beginPath();

        ctx.moveTo(px1, py1);

        if (!src.closePath) {
            pathLength -= 2;
        }

        for (var i = 2; i < pathLength; i += 2) {
            var px2 = path[i] - dx;
            var py2 = path[i + 1] - dy;

            ctx.lineTo(px2, py2);
        }

        ctx.closePath();

        if (src.isFilled) {
            FillStyleCanvas(ctx, src);

            ctx.fill();
        }

        if (src.isStroked) {
            LineStyleCanvas(ctx, src);

            ctx.stroke();
        }

        //  Restore the context saved in SetTransform
        ctx.restore();
    }
};

export default PolygonCanvasRenderer;
