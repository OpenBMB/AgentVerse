const PointRotateAround = Phaser.Math.RotateAround;

var RotateAround = function (polygon, centerX, centerY, angle) {
    var points = polygon.points;
    for (var i = 0, cnt = points.length; i < cnt; i++) {
        PointRotateAround(points[i], centerX, centerY, angle);
    }
    return polygon;
};

export default RotateAround;