import IsSceneObject from './IsSceneObject.js';

var GetSceneObject = function (object) {
    if ((object == null) || (typeof (object) !== 'object')) {
        return null;
    } else if (IsSceneObject(object)) { // object = scene
        return object;
    } else if (object.scene && IsSceneObject(object.scene)) { // object = game object
        return object.scene;
    } else if (object.parent && object.parent.scene && IsSceneObject(object.parent.scene)) { // parent = bob object
        return object.parent.scene;
    } else {
        return null;
    }
}

export default GetSceneObject;