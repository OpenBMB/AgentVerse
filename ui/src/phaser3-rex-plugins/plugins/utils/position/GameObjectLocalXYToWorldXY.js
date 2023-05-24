const TransformMatrix = Phaser.GameObjects.Components.TransformMatrix;

var GameObjectLocalXYToWorldXY = function (gameObject, localX, localY, out) {
    if (out === undefined) {
        out = {}
    } else if (out === true) {
        out = globOut;
    }

    var px = localX - (gameObject.width * gameObject.originX);
    var py = localY - (gameObject.height * gameObject.originY);

    if (tempMatrix === undefined) {
        tempMatrix = new TransformMatrix();
        parentMatrix = new TransformMatrix();
    }

    if (gameObject.parentContainer) {
        gameObject.getWorldTransformMatrix(tempMatrix, parentMatrix);
    }
    else {
        tempMatrix.applyITRS(gameObject.x, gameObject.y, gameObject.rotation, gameObject.scaleX, gameObject.scaleY);
    }

    tempMatrix.transformPoint(px, py, out);

    return out;
}

var tempMatrix, parentMatrix;
var globOut = {};

export default GameObjectLocalXYToWorldXY