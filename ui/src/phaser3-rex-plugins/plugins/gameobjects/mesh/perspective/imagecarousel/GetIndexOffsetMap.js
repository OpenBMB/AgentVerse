var GetIndexOffsetMap = function (faceCount) {
    var indexOffsetMap = [0];
    for (var i = 1, cnt = Math.floor((faceCount - 1) / 2); i <= cnt; i++) {
        indexOffsetMap.push(i);
        indexOffsetMap.push(-i);
    }
    return indexOffsetMap;
}
export default GetIndexOffsetMap;