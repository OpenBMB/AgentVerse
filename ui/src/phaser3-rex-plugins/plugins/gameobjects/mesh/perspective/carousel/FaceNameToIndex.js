var FaceNameToIndex = function (faces, name) {
    for (var i = 0, cnt = faces.length; i < cnt; i++) {
        if (face && (face.name === name)) {
            return i;
        }
    }
    return -1;
}

export default FaceNameToIndex;