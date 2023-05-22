var IsEmptyTileXYZ = function (tileX, tileY, tileZ) {
    // TileXY is inside board, and TileXYZ has no chess
    return this.contains(tileX, tileY) && !this.contains(tileX, tileY, tileZ);
}

export default IsEmptyTileXYZ;