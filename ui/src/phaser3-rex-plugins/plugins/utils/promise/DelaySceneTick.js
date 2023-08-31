var DelaySceneTick = function (scene, s, result) {
    if (s === undefined) {
        s = 0;
    }
    return new Promise(function (resolve, reject) {
        scene.time.delayedCall(s, resolve, [result]);
    });
}

export default DelaySceneTick;