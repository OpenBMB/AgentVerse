// import CubicBezierInterpolation from '../../utils/math/interpolation/CubicBezierInterpolation.js';

const CubicBezierInterpolation = Phaser.Math.Interpolation.CubicBezier;

var CubicBezierCurveTo = function (cx0, cy0, cx1, cy1, x, y, iterations, pathData) {
    var pathDataCnt = pathData.length;
    var p0x = pathData[pathDataCnt - 2];
    var p0y = pathData[pathDataCnt - 1];
    for (var i = 1, last = iterations - 1; i <= last; i++) {
        var t = i / last;
        pathData.push(
            CubicBezierInterpolation(t, p0x, cx0, cx1, x),
            CubicBezierInterpolation(t, p0y, cy0, cy1, y)
        );
    }
    return pathData;
}

export default CubicBezierCurveTo;