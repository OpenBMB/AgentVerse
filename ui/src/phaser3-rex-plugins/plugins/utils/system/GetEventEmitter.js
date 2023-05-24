import IsSceneObject from './IsSceneObject.js';

var GetEventEmitter = function (object) {
    if (IsSceneObject(object)) {
        return object.events;
    } else if (object.on) {
        return object;
    }
}

export default GetEventEmitter;