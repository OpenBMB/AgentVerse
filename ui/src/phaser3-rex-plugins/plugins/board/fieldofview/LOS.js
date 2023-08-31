import IsArray from '../../utils/object/IsArray.js';
import IsPlainObject from '../../utils/object/IsPlainObject.js';

var LOS = function (chessArray, visiblePoints, originTileXY, out) {
    // chessArray: array of chess object or tileXY
    if (!IsArray(chessArray)) {
        var chess = chessArray;
        return this.isInLOS(chess, visiblePoints, originTileXY);
    } else {
        if (IsPlainObject(visiblePoints)) {
            out = originTileXY;
            originTileXY = visiblePoints;
            visiblePoints = undefined;
        } else if (IsArray(visiblePoints)) {
            out = visiblePoints;
            visiblePoints = undefined;
            originTileXY = undefined;
        }
        if (IsArray(originTileXY)) {
            out = originTileXY;
            originTileXY = undefined;
        }

        if (out === undefined) {
            out = [];
        }

        var chess;
        for (var i = 0, cnt = chessArray.length; i < cnt; i++) {
            chess = chessArray[i];
            if (!this.isInLOS(chess, visiblePoints, originTileXY)) {
                continue;
            }
            out.push(chess)
        }
        return out;
    }
}

export default LOS;