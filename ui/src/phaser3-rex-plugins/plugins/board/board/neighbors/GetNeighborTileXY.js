var GetNeighborTileXY = function (srcTileXY, directions, out) {
    return this.getTileXYAtDirection(srcTileXY, directions, 1, out);
};

export default GetNeighborTileXY;