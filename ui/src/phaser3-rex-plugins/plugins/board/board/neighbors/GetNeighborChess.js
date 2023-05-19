var GetNeighborChess = function (tileXYZ, directions, neighborTileZ, out) {
    var tileXYZ = this.chessToTileXYZ(tileXYZ);
    if (tileXYZ === null) {
        return null;
    }

    if (neighborTileZ == null) {
        neighborTileZ = tileXYZ.z;
    }

    var typeOfDirection = typeof (directions);
    if (
        (typeOfDirection === 'number') ||
        ((typeOfDirection === 'string') && (directions.indexOf(',') === -1))
    ) {
        // 1 direction
        var dir = directions;
        var neighborTileXY = this.getNeighborTileXY(tileXYZ, dir, true);
        if (neighborTileXY === null) {
            return null;
        }
        return this.tileXYZToChess(neighborTileXY.x, neighborTileXY.y, neighborTileZ);
    } else {
        // directions array
        if (out === undefined) {
            out = [];
        }
        this.getNeighborTileXY(tileXYZ, directions, globTileXYArray);
        var neighborChess;
        for (var i = 0, cnt = globTileXYArray.length; i < cnt; i++) {
            neighborChess = this.tileXYZToChess(globTileXYArray[i].x, globTileXYArray[i].y, neighborTileZ);
            if (neighborChess == null) {
                continue;
            }
            out.push(neighborChess);
        }
        globTileXYArray.length = 0;
        return out;
    }
}

var globTileXYArray = [];
export default GetNeighborChess;