var Offset = function (x, y, pathData) {
    for (var i = 0, cnt = pathData.length - 1; i < cnt; i += 2) {
        pathData[i] += x;
        pathData[i + 1] += y;
    }
    return pathData;
}

export default Offset;