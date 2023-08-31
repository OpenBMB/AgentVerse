import DeltaTileXYToDirection from './DeltaTileXYToDirection.js';
import GetParity from './GetParity.js';

var GetNeighborTileDirection = function (srcTileXY, neighborTileXY) {
    var parity = GetParity(this.mode, srcTileXY.x, srcTileXY.y);
    var deltaTileXYToDirMap = DeltaTileXYToDirection[this.mode][parity];

    var deltaTileX = neighborTileXY.x - srcTileXY.x;
    var deltaTileY = neighborTileXY.y - srcTileXY.y;    
    if (deltaTileXYToDirMap.hasOwnProperty(deltaTileX)) {
        var xEntry = deltaTileXYToDirMap[deltaTileX]
        if (xEntry.hasOwnProperty(deltaTileY)) {
            return xEntry[deltaTileY];
        }
    }
    return null;
}
export default GetNeighborTileDirection;