var LineTo = function (x, y, pathData) {
    var cnt = pathData.length;
    if (cnt >= 2) {
        var lastX = pathData[cnt - 2];
        var lastY = pathData[cnt - 1];
        if ((x === lastX) && (y === lastY)) {
            return pathData;
        }
    }

    pathData.push(x, y);
    return pathData;
}

export default LineTo;