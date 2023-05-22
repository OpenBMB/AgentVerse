//import PointRotateAround from '../../utils/math/RotateAround.js';

const PointRotateAround = Phaser.Math.RotateAround;

var RotateAround = function (centerX, centerY, angle, pathData) {
    var point = { x: 0, y: 0 };
    for (var i = 0, cnt = pathData.length - 1; i < cnt; i += 2) {
        point.x = pathData[i];
        point.y = pathData[i + 1];
        PointRotateAround(point, centerX, centerY, angle);
        pathData[i] = point.x;
        pathData[i + 1] = point.y;
    }
    return pathData;
}

export default RotateAround;