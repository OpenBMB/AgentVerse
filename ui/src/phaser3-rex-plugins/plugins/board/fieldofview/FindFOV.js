import IsArray from '../../utils/object/IsArray.js';
import IsPlainObject from '../../utils/object/IsPlainObject.js';

var FindFOV = function (visiblePoints, originTileXY, out) {
    if (IsPlainObject(visiblePoints)) {
        out = originTileXY;
        originTileXY = visiblePoints;
        visiblePoints = undefined;
    } else if (IsArray(visiblePoints)) {
        out = visiblePoints;
        originTileXY = undefined;
        visiblePoints = undefined;
    }
    if (IsArray(originTileXY)) {
        out = originTileXY;
        originTileXY = undefined;
    }

    if (out === undefined) {
        out = [];
    }

    var board = this.board;
    var myTileXYZ = this.chessData.tileXYZ,
        targetTileXY;
    var isAnyVisible, hasAnyTestingTileXY;
    var radius = 1;

    while (true) {
        isAnyVisible = false;
        hasAnyTestingTileXY = false;
        board.ringToTileXYArray(myTileXYZ, radius, globRing);
        for (var i = 0, cnt = globRing.length; i < cnt; i++) {
            targetTileXY = globRing[i];
            if (!board.contains(targetTileXY.x, targetTileXY.y)) {
                continue;
            }
            hasAnyTestingTileXY = true;
            if (this.isInLOS(targetTileXY, visiblePoints, originTileXY)) {
                isAnyVisible = true;
                out.push(targetTileXY);
            }
        }
        radius++;
        globRing.length = 0;

        if (!this.perspectiveEnable && !isAnyVisible) {
            if (!isAnyVisible) {
                break;
            }
        } else {
            if (!hasAnyTestingTileXY) {
                break;
            }
        }
    }

    return out;
}

var globRing = [];

export default FindFOV;