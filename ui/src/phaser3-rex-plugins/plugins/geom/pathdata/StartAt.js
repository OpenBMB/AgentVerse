var StartAt = function (x, y, pathData) {
    pathData.length = 0;

    if (x != null) {
        pathData.push(x, y);
    }

    return pathData;
}

export default StartAt;