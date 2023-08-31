import GetSceneObject from '../system/GetSceneObject.js';

var UpdateDelayCall = function (gameObject, delay, callback, scope, args) {
    // Invoke callback under scene's 'update' event
    var scene = GetSceneObject(gameObject);
    var timer = scene.time.delayedCall(delay, function () {
        scene.sys.events.once('update', function () {
            callback.call(scope, args);
        })
    })
    return timer;
}

export default UpdateDelayCall;