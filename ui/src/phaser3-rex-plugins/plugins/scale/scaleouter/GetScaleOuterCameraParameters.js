var GetScaleOutCameraParameters = function (scene, out) {
    if (out === undefined) {
        out = {};
    }

    var gameConfig = scene.game.config;
    var gameWidth = gameConfig.width,
        gameHeight = gameConfig.height;
    var gameAspectRatio = (gameHeight === 0) ? 1 : gameWidth / gameHeight;

    var displaySize = scene.sys.scale.displaySize;
    var displayWidth = displaySize.width,
        displayHeight = displaySize.height;
    var displayAspectRatio = (displayHeight === 0) ? 1 : displayWidth / displayHeight;

    out.scrollX = (gameWidth - displayWidth) / 2;
    out.scrollY = (gameHeight - displayHeight) / 2;

    if (gameAspectRatio < displayAspectRatio) {
        out.zoom = (displayHeight / gameHeight);
    } else {
        out.zoom = (displayWidth / gameWidth)
    }

    return out;
}

export default GetScaleOutCameraParameters;