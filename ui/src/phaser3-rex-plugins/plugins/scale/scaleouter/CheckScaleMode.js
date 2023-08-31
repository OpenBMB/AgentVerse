var WarnCounter = 0;

var CheckScaleMode = function (scene) {
    var scaleManager = scene.sys.scale;
    if (scaleManager.scaleMode === Phaser.Scale.RESIZE) {
        return true;
    }

    // Not RESIZE mode
    if (WarnCounter === 0) {
        console.warn('Scale outer only works with RESIZE scale mode');
    }
    WarnCounter++;
    return false;
}

export default CheckScaleMode;