var GetMinMaxTileXY = function (chessTileXYZMap, out) {
    if (chessTileXYZMap === undefined) {
        chessTileXYZMap = this.tileXYZMap; // {uid:{x,y,z}}
    }
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globResult;
    }
    var minX = Infinity, maxX = -Infinity;
    var minY = Infinity, maxY = -Infinity;
    var chessTileXYZ;
    for (var uid in this.tileXYZMap) {
        chessTileXYZ = this.tileXYZMap[uid];
        if (chessTileXYZ.x < minX) {
            minX = chessTileXYZ.x;
        }
        if (chessTileXYZ.x > maxX) {
            maxX = chessTileXYZ.x;
        }
        if (chessTileXYZ.y < minY) {
            minY = chessTileXYZ.y;
        }
        if (chessTileXYZ.y > maxY) {
            maxY = chessTileXYZ.y;
        }
    }
    out.minX = minX;
    out.minY = minY;
    out.maxX = maxX;
    out.maxY = maxY;
    return out;
}

var globResult = {};

export default GetMinMaxTileXY;