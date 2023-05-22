import IsSceneObject from '../../system/IsSceneObject.js';

var AddEvent = function (target, eventEmitter, eventName, callback, scope) {
    eventEmitter.on(eventName, callback, scope);

    if (!IsSceneObject(target)) {
        target.once('destroy', function () {
            eventEmitter.off(eventName, callback, scope);
        })
    } else {
        // target is scene
        target.sys.events.once('shutdown', function () {
            eventEmitter.off(eventName, callback, scope);
        });
    }
    return target;
}

export default AddEvent;