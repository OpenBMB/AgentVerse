import AddEvent from './AddEvent.js';
import IsSceneObject from '../../system/IsSceneObject.js';

var AddSceneEvent = function (target, eventName, callback, scope) {
    var eventEmitter = (!IsSceneObject(target)) ? target.scene.sys.events : target.sys.events;
    return AddEvent(target, eventEmitter, eventName, callback, scope);
}

export default AddSceneEvent;