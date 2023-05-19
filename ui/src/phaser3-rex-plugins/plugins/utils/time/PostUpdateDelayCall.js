import GetSceneObject from '../system/GetSceneObject.js';

var PostUpdateDelayCall = function (gameObject, delay, callback, scope, args) {
    // Invoke callback under scene's 'postupdate' event
    var scene = GetSceneObject(gameObject);
    var timer = scene.time.delayedCall(delay, function () {
        scene.sys.events.once('postupdate', function () {
            callback.call(scope, args);
        })
    })
    return timer;
}

export default PostUpdateDelayCall;