var NextTick = function (scene, callback, scope) {
    return scene.time.delayedCall(0, callback, [], scope);
}

export default NextTick;