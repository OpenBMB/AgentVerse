import GetTileXAtDirection from './GetTileXYAtDirection.js';

var GetNeighborTileXY = function (tileX, tileY, direction, out) {
    return GetTileXAtDirection.call(this, tileX, tileY, direction, 1, out);
};

export default GetNeighborTileXY;