import GetSceneObject from '../system/GetSceneObject.js';

var PreUpdateDelayCall = function (gameObject, delay, callback, scope, args) {
    // Invoke callback under scene's 'preupdate' event
    var scene = GetSceneObject(gameObject);
    var timer = scene.time.delayedCall(delay, function () {
        scene.sys.events.once('preupdate', function () {
            callback.call(scope, args);
        })
    })
    return timer;
}

export default PreUpdateDelayCall;