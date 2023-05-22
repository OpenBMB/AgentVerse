import ForEachFace from '../utils/ForEachFace.js';

var LayoutFaces = function (parent, faces) {
    if (parent.faceWidth === 0) {
        return;
    }

    var radius = parent.faceRadius;
    ForEachFace(faces, function (face) {
        var transferZ = radius / face.height;
        face
            .transformVerts(0, 0, transferZ)
            .panZ(transferZ);

    }, null, true);
}

export default LayoutFaces;