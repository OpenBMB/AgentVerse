var GetFirstFace = function (faces) {
    var face;
    for (var i = 0, cnt = faces.length; i < cnt; i++) {
        face = faces[i];
        if (face) {
            break;
        }
    }
    return face;
}

export default GetFirstFace