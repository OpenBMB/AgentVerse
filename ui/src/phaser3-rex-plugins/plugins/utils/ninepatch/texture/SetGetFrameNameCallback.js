var SetGetFrameNameCallback = function(callback) {
    if (callback === undefined) {
        callback = DefaultGetFrameNameCallback;
    }
    this.getFrameNameCallback = callback;
    return this;
}

var DefaultGetFrameNameCallback = function (colIndex, rowIndex, baseFrameName) {
    if (baseFrameName === '__BASE') {
        return `${colIndex},${rowIndex}`;
    } else {
        return `${baseFrameName}_${colIndex},${rowIndex}`;
    }
}

export default SetGetFrameNameCallback;