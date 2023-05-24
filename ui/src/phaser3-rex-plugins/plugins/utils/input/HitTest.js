var HitTest = function (scene, topOnly, gameObjects, pointers, out) {
    var inputPlugin = scene.input;
    var inputManager = inputPlugin.manager;

    if (topOnly === undefined) {
        topOnly = inputPlugin.topOnly;
    }
    if (out === undefined) {
        out = [];
    }
    if (gameObjects === undefined) {
        gameObjects = inputPlugin._list;
    }

    var pointersTotal, pointer;
    if (pointers === undefined) {
        pointers = inputManager.pointers;
        pointersTotal = inputManager.pointersTotal;
    }
    if (pointersTotal === undefined) {
        pointersTotal = pointers.length;
    }

    var cameras;
    for (var pointerIdx = 0; pointerIdx < pointersTotal; pointerIdx++) {
        pointer = pointers[pointerIdx];
        cameras = inputPlugin.cameras.getCamerasBelowPointer(pointer);
        for (var cameraIdx = 0, camerasTotal = cameras.length; cameraIdx < camerasTotal; cameraIdx++) {
            out.push(...inputManager.hitTest(pointer, gameObjects, cameras[cameraIdx]));
        }
    }

    inputPlugin.sortGameObjects(out);
    if (topOnly){
        if (out.length) {
            out.splice(1);
        }
    }

    return out;
}

export default HitTest;