import IsPointerInHitArea from './IsPointerInHitArea.js';

var RequestDrag = function (gameObject) {
    var inputPlugin = gameObject.scene.input;
    var inputManager = inputPlugin.manager;
    var pointersTotal = inputManager.pointersTotal;
    var pointers = inputManager.pointers,
        pointer;
    for (var i = 0; i < pointersTotal; i++) {
        pointer = pointers[i];
        if (
            (!pointer.primaryDown) ||
            (inputPlugin.getDragState(pointer) !== 0) ||
            (!IsPointerInHitArea(gameObject, pointer))
        ) {
            continue;
        }

        // For 3.18.0
        inputPlugin.setDragState(pointer, 1);
        inputPlugin._drag[pointer.id] = [gameObject];
        if ((inputPlugin.dragDistanceThreshold === 0) || (inputPlugin.dragTimeThreshold === 0)) {
            //  No drag criteria, so snap immediately to mode 3
            inputPlugin.setDragState(pointer, 3);
            inputPlugin.processDragStartList(pointer);
        } else {
            //  Check the distance / time on the next event
            inputPlugin.setDragState(pointer, 2);
        }
        // For 3.18.0

        return true;
    }

    return false;
}

export default RequestDrag;