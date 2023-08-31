import { CreateTileData } from './TileData.js';
import CONST from './const.js';

const STOP = CONST.STOP;

var GetPath = function (movingPoints, out) {
    if (out === undefined) {
        out = [];
    }
    if (this.board === null) { // chess is not in board
        return out;
    }
    var curTileXYZ = this.chessData.tileXYZ,
        curTileData = CreateTileData(curTileXYZ.x, curTileXYZ.y, this.face),
        nextTileData;
    var cost;
    while (movingPoints > 0) {
        nextTileData = this.getNextTile(curTileData, this.preTileXY);
        if (nextTileData === null) {
            break;
        }
        cost = this.getCost(nextTileData, curTileData);
        if (cost === STOP) {
            cost = movingPoints;
        }
        nextTileData.cost = cost;
        if (movingPoints >= cost) {
            out.push(nextTileData);
        }
        movingPoints -= cost;

        this.preTileXY = curTileData;
        curTileData = nextTileData;
    }

    // remove cost = 0 at tail
    for (var i = out.length - 1; i >= 0; i--) {
        if (out[i].cost === 0) {
            out.length = i;
        } else {
            break;
        }
    }
    return out;
}

export default GetPath;