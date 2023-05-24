var UpdateViewMatrix = function (model, calcMatrix) {
    var gameObject = model.parent;
    var projectionMatrix = model._globalData.projectionMatrix;

    var matrix = model.viewMatrix;
    // Reset to identity matrix
    matrix.loadIdentity();

    // Apply scale
    var modelWidth = gameObject.width;
    var modelHeight = gameObject.height;
    var canvasWidth = projectionMatrix.width;
    var canvasHeight = projectionMatrix.height

    var scaleX = (calcMatrix.scaleX * modelWidth) / canvasWidth;
    var scaleY = (calcMatrix.scaleY * modelHeight) / canvasHeight;

    if (modelWidth > modelHeight) {
        scaleY *= modelWidth / modelHeight;
    } else {
        scaleX *= modelHeight / modelWidth;
    }

    matrix.scale(scaleX, scaleY);

    // Apply rotate
    matrix.rotate(-calcMatrix.rotationNormalized);

    // Apply translate
    matrix.translate(
        projectionMatrix.toLocalX(calcMatrix.getX(0, 0)),
        projectionMatrix.toLocalY(calcMatrix.getY(0, 0))
    );

    var modelMatrix = model._modelMatrix;
    // Offset for origin
    // modelMatrix.translate(
    //     modelMatrix._width * (0.5 - gameObject.originX),
    //     modelMatrix._height * (gameObject.originY - 0.5)
    // );
    // Apply model matrix
    matrix.multiplyByMatrix(modelMatrix);

    return matrix;
}

export default UpdateViewMatrix;