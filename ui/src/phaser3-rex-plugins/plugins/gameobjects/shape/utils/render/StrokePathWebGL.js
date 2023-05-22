/*
src: {
    strokeColor,
    strokeAlpha,
    pathData,
    lineWidth,
    closePath
}
*/
var Utils = Phaser.Renderer.WebGL.Utils;

var StrokePathWebGL = function (pipeline, src, alpha, dx, dy)
{
    var strokeTint = pipeline.strokeTint;
    var strokeTintColor = Utils.getTintAppendFloatAlpha(src.strokeColor, src.strokeAlpha * alpha);

    strokeTint.TL = strokeTintColor;
    strokeTint.TR = strokeTintColor;
    strokeTint.BL = strokeTintColor;
    strokeTint.BR = strokeTintColor;

    var path = src.pathData;
    var pathLength = path.length - 1;
    var lineWidth = src.lineWidth;
    var halfLineWidth = lineWidth / 2;

    var px1 = path[0] - dx;
    var py1 = path[1] - dy;

    if (!src.closePath)
    {
        pathLength -= 2;
    }

    for (var i = 2; i < pathLength; i += 2)
    {
        var px2 = path[i] - dx;
        var py2 = path[i + 1] - dy;

        pipeline.batchLine(
            px1,
            py1,
            px2,
            py2,
            halfLineWidth,
            halfLineWidth,
            lineWidth,
            i - 2,
            (src.closePath) ? (i === pathLength - 1) : false
        );

        px1 = px2;
        py1 = py2;
    }
};

export default StrokePathWebGL;
