var ToPoints = function (pathData, points) {
    if (points === undefined) {
        points = [];
    }
    for (var i = 0, cnt = pathData.length - 1; i < cnt; i += 2) {
        points.push({
            x: pathData[i],
            y: pathData[i + 1]
        })
    }
    return points;
}

export default ToPoints;