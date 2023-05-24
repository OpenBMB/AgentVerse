var Fill = function (arr, value, startIdx, endIdx) {
    if (startIdx === undefined) {
        startIdx = 0;
    }
    if (endIdx === undefined) {
        endIdx = arr.length - 1;
    }
    for (var i = startIdx; i <= endIdx; i++) {
        arr[i] = value;
    }
    return arr;
}

export default Fill;