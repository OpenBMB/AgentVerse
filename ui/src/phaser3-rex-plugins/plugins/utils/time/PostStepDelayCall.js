import GetSceneObject from '../system/GetSceneObject.js';

var PostStepDelayCall = function (gameObject, delay, callback, scope, args) {
    // Invoke callback under game's 'poststep' event
    var scene = GetSceneObject(gameObject);
    var timer = scene.time.delayedCall(delay, function () {
        scene.game.events.once('poststep', function () {
            callback.call(scope, args);
        });
    })
    return timer;
}

export default PostStepDelayCall;