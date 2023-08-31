const TransformMatrix = Phaser.GameObjects.Components.TransformMatrix;
const TransformXY = Phaser.Math.TransformXY;

var WorldXYToGameObjectLocalXY = function (gameObject, worldX, worldY, camera, out) {
    if (camera === undefined) {
        camera = gameObject.scene.cameras.main;
    }

    if (out === undefined) {
        out = {}
    } else if (out === true) {
        out = globOut;
    }

    var csx = camera.scrollX;
    var csy = camera.scrollY;
    var px = worldX + (csx * gameObject.scrollFactorX) - csx;
    var py = worldY + (csy * gameObject.scrollFactorY) - csy;
    if (gameObject.parentContainer) {
        if (tempMatrix === undefined) {
            tempMatrix = new TransformMatrix();
            parentMatrix = new TransformMatrix();
        }

        gameObject.getWorldTransformMatrix(tempMatrix, parentMatrix);
        tempMatrix.applyInverse(px, py, out);
    }
    else {
        TransformXY(px, py, gameObject.x, gameObject.y, gameObject.rotation, gameObject.scaleX, gameObject.scaleY, out);
    }

    out.x += gameObject.displayOriginX;
    out.y += gameObject.displayOriginY;

    return out;
}

var tempMatrix, parentMatrix;
var globOut = {};

export default WorldXYToGameObjectLocalXY;