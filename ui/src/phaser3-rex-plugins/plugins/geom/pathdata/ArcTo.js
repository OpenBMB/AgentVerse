import LineTo from './LineTo.js';

const DegToRad = Phaser.Math.DegToRad;

var ArcTo = function (centerX, centerY, radiusX, radiusY, startAngle, endAngle, antiClockWise, iteration, pathData) {
    // startAngle, endAngle: 0 ~ 360
    if (antiClockWise && (endAngle > startAngle)) {
        endAngle -= 360;
    } else if (!antiClockWise && (endAngle < startAngle)) {
        endAngle += 360;
    }

    var deltaAngle = endAngle - startAngle;
    var step = DegToRad(deltaAngle) / iteration;
    startAngle = DegToRad(startAngle);
    for (var i = 0; i <= iteration; i++) {
        var angle = startAngle + (step * i);
        var x = centerX + (radiusX * Math.cos(angle));
        var y = centerY + (radiusY * Math.sin(angle));
        LineTo(x, y, pathData);
    }
    return pathData;
}
export default ArcTo;