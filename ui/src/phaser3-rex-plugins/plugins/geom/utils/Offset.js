var Offset = function (polygon, x, y) {
    var points = polygon.points,
        point;
    for (var i = 0, cnt = points.length; i < cnt; i++) {
        point = points[i];
        point.x += x;
        point.y += y;
    }
    return polygon;
};

export default Offset;