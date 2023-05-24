const Rectangle = Phaser.Geom.Rectangle;
var GetOuterViewport = function (scaleOuter, out) {
    if (out === undefined) {
        out = new Rectangle();
    }

    var scale = 1 / scaleOuter.zoom;
    var displaySize = scaleOuter.scene.sys.scale.displaySize;
    out.width = displaySize.width * scale;
    out.height = displaySize.height * scale;

    var gameConfig = scaleOuter.scene.game.config;
    out.centerX = gameConfig.width / 2;
    out.centerY = gameConfig.height / 2;

    return out;
}
export default GetOuterViewport;