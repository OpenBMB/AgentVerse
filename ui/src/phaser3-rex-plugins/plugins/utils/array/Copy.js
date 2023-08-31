var Copy = function (dest, src, startIdx, endIdx) {
    if (startIdx === undefined) {
        startIdx = 0
    };
    if (endIdx === undefined) {
        endIdx = src.length;
    }
    dest.length = endIdx - startIdx;
    for (var i = 0, len = dest.length; i < len; i++) {
        dest[i] = src[i + startIdx];
    }
    return dest;
};
export default Copy;