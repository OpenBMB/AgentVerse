const Vector3 = Phaser.Math.Vector3;
const Matrix4 = Phaser.Math.Matrix4;

var tempPosition = new Vector3();
var tempRotation = new Vector3();
var tempMatrix = new Matrix4();

var TransformVerts = function (mesh, x, y, z, rotateX, rotateY, rotateZ) {
    if (x === undefined) { x = 0; }
    if (y === undefined) { y = 0; }
    if (z === undefined) { z = 0; }
    if (rotateX === undefined) { rotateX = 0; }
    if (rotateY === undefined) { rotateY = 0; }
    if (rotateZ === undefined) { rotateZ = 0; }

    tempPosition.set(x, y, z);
    tempRotation.set(rotateX, rotateY, rotateZ);
    tempMatrix.fromRotationXYTranslation(tempRotation, tempPosition, true);

    for (var i = 0, cnt = mesh.vertices.length; i < cnt; i++) {
        mesh.vertices[i].transformMat4(tempMatrix);
    }
}

export default TransformVerts;