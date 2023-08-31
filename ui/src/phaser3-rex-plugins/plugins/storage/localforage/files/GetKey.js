var GetHeaderKey = function (fileID) {
    return `H-${fileID}`;
}

var GetContentKey = function (fileID) {
    return `C-${fileID}`;
}

var IsHeaderKey = function (key) {
    return key.charAt(0) === 'H';
}

var IsContentKey = function (key) {
    return key.charAt(0) === 'C';
}

var GetFileID = function (key) {
    return key.split('-')[1];
}

export {
    GetHeaderKey, GetContentKey,
    IsHeaderKey, IsContentKey,
    GetFileID
};