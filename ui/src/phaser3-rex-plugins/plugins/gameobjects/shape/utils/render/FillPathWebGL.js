/*
src: {
    fillColor, 
    fillAlpha, 
    pathData, 
    pathIndexes  // Earcut(pathData)
}
*/

var Utils = Phaser.Renderer.WebGL.Utils;

var FillPathWebGL = function (pipeline, calcMatrix, src, alpha, dx, dy)
{
    var fillTintColor = Utils.getTintAppendFloatAlpha(src.fillColor, src.fillAlpha * alpha);

    var path = src.pathData;
    var pathIndexes = src.pathIndexes;

    for (var i = 0; i < pathIndexes.length; i += 3)
    {
        var p0 = pathIndexes[i] * 2;
        var p1 = pathIndexes[i + 1] * 2;
        var p2 = pathIndexes[i + 2] * 2;

        var x0 = path[p0 + 0] - dx;
        var y0 = path[p0 + 1] - dy;
        var x1 = path[p1 + 0] - dx;
        var y1 = path[p1 + 1] - dy;
        var x2 = path[p2 + 0] - dx;
        var y2 = path[p2 + 1] - dy;

        var tx0 = calcMatrix.getX(x0, y0);
        var ty0 = calcMatrix.getY(x0, y0);
        var tx1 = calcMatrix.getX(x1, y1);
        var ty1 = calcMatrix.getY(x1, y1);
        var tx2 = calcMatrix.getX(x2, y2);
        var ty2 = calcMatrix.getY(x2, y2);

        pipeline.batchTri(src, tx0, ty0, tx1, ty1, tx2, ty2, 0, 0, 1, 1, fillTintColor, fillTintColor, fillTintColor, 2);
    }
};

export default FillPathWebGL;
