import AddSceneEvent from './AddSceneEvent.js';

var AddUpdateEvent = function (target, callback, scope) {
    return AddSceneEvent(target, 'update', callback, scope);
}

export default AddUpdateEvent;