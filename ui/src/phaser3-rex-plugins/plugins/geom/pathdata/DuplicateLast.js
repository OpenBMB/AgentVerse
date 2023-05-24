var DuplicateLast = function (pathData) {
    var len = pathData.length;
    if (len < 2) {
        return pathData;
    }

    var lastX = pathData[len - 2];
    var lastY = pathData[len - 1];
    pathData.push(lastX);
    pathData.push(lastY);

    return pathData;
}

export default DuplicateLast;