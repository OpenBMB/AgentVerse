import IsPointInBounds from '../bounds/IsPointInBounds.js';

var IsPointerInBounds = function (gameObject, pointer, preTest, postTest) {
    if (pointer) {
        return IsPointInBounds(gameObject, pointer.worldX, pointer.worldY, preTest, postTest);

    } else {
        var inputManager = gameObject.scene.input.manager;
        var pointersTotal = inputManager.pointersTotal;
        var pointers = inputManager.pointers;
        for (var i = 0; i < pointersTotal; i++) {
            pointer = pointers[i];
            if (IsPointInBounds(gameObject, pointer.worldX, pointer.worldY, preTest, postTest)) {
                return true;
            }
        }
        return false;

    }

}

export default IsPointerInBounds;