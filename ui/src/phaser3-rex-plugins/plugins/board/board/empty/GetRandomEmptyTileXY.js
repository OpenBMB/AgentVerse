import Random from '../../../utils/math/Between.js';
import GetRandomItem from '../../../utils/array/GetRandom.js';

var GetRandomEmptyTileXY = function (tileZ, out) {
    if (tileZ === undefined) {
        tileZ = 0;
    }
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globTileXY;
    }

    var tileX, tileY;
    var isOccupied = true;
    var tryCount = 20;
    while (isOccupied && (tryCount > 0)) {
        tileX = Random(0, this.width - 1);
        tileY = Random(0, this.height - 1);
        isOccupied = (this.tileXYZToChess(tileX, tileY, tileZ) !== null);
        tryCount--;
    }

    if (!isOccupied) {
        out.x = tileX;
        out.y = tileY;
        return out;
    } else {
        globTileXYArray = this.getEmptyTileXYArray(tileZ, globTileXYArray);
        if (globTileXYArray.length === 0) {
            return null;
        } else {
            var tileXY = GetRandomItem(globTileXYArray);
            out.x = tileXY.x;
            out.y = tileXY.y;
            globTileXYArray.length = 0;
            return out;
        }
    }
}

var globTileXYArray = [];
var globTileXY = {};
export default GetRandomEmptyTileXY;