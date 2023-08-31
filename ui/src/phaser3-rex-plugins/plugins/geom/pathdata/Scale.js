var Scale = function (centerX, centerY, scaleX, scaleY, pathData) {
    for (var i = 0, cnt = pathData.length - 1; i < cnt; i += 2) {
        var x = pathData[i] - centerX;
        var y = pathData[i + 1] - centerY;
        x *= scaleX;
        y *= scaleY;
        pathData[i] = x + centerX;
        pathData[i + 1] = y + centerY;
    }
    return pathData;
}

export default Scale;