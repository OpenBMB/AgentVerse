var GetEmptyTileXYArray = function (tileZ, out) {
    if (tileZ === undefined) {
        tileZ = 0;
    }
    if (out === undefined) {
        out = [];
    }

    for (var tileY = 0; tileY < this.height; tileY++) {
        for (var tileX = 0; tileX < this.width; tileX++) {
            if (this.isEmptyTileXYZ(tileX, tileY, tileZ)) {
                out.push({
                    x: tileX,
                    y: tileY
                });
            }
        }
    }
    return out;
}
export default GetEmptyTileXYArray;