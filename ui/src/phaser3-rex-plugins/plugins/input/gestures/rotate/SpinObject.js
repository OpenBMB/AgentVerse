import RotateObjectAround from '../../../utils/actions/RotateObjectAround.js';
import ScreenXYToWorldXY from '../../../utils/position/ScreenXYToWorldXY.js';

var SpinObject = function (gameObject, camera) {
    if (!this.isRotation) {
        return this;
    }

    if (camera === undefined) {
        camera = this.pointers[0].camera;
    }

    var movementX = this.movementCenterX,
        movementY = this.movementCenterY;

    var worldXY = ScreenXYToWorldXY(this.centerX, this.centerY, camera, true);
    var centerWorldX = worldXY.x;
    var centerWorldY = worldXY.y;

    var angle = this.rotation;
    if (Array.isArray(gameObject)) {
        var gameObjects = gameObject;
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            gameObject = gameObjects[i];
            gameObject.x += movementX;
            gameObject.y += movementY;
            RotateObjectAround(gameObject, centerWorldX, centerWorldY, angle);
        }
    } else {
        gameObject.x += movementX;
        gameObject.y += movementY;
        RotateObjectAround(gameObject, centerWorldX, centerWorldY, angle);
    }
    return this;
}

export default SpinObject;