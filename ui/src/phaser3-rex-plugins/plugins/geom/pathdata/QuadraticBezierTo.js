//import QuadraticBezierInterpolation from '../../utils/math/interpolation/QuadraticBezierInterpolation.js';

const QuadraticBezierInterpolation = Phaser.Math.Interpolation.QuadraticBezier;

var QuadraticBezierTo = function (cx, cy, x, y, iterations, pathData) {
    var pathDataCnt = pathData.length;
    var p0x = pathData[pathDataCnt - 2];
    var p0y = pathData[pathDataCnt - 1];
    for (var i = 1, last = iterations - 1; i <= last; i++) {
        var t = i / last;
        pathData.push(
            QuadraticBezierInterpolation(t, p0x, cx, x),
            QuadraticBezierInterpolation(t, p0y, cy, y)
        );
    }
    return pathData;
}

export default QuadraticBezierTo;