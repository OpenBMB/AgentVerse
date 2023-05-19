var GetNeighborTileXYAtAngle = function (srcTileXY, angle, out) {
    var direction = this.angleSnapToDirection(srcTileXY, angle);
    return this.getTileXYAtDirection(srcTileXY, direction, 1, out);
};

export default GetNeighborTileXYAtAngle;