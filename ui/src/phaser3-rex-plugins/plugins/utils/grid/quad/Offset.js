var Offset = function (srcTile, offsetTileX, offsetTileY, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globTileXY;
    }

    var newTileX = srcTile.x + offsetTileX;
    var newTileY = srcTile.y + offsetTileY;
    // TODO: staggered?
    out.x = newTileX;
    out.y = newTileY;
    return out;
}

var globTileXY = {};
export default Offset;