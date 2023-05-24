var InitPoints = function (count) {
    var points = [];
    for (var i = 0; i < count; i++) {
        points.push({
            x: 0,
            y: 0
        });
    }
    return points;
}

export default InitPoints;