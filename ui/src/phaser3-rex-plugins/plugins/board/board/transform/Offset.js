var Offset = function (tileXY, OffsetTileX, OffsetTileY, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globTileXY;
    }

    if ((OffsetTileX === 0) && (OffsetTileY === 0)) {
        out.x = tileXY.x;
        out.y = tileXY.y;
    } else {
        this.grid.offset(tileXY, OffsetTileX, OffsetTileY, out);
    }
    return out;
};

var globTileXY = {};
export default Offset;