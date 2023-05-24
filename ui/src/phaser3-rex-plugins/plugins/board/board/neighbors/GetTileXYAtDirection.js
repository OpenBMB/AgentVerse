import IsPlainObject from '../../../utils/object/IsPlainObject.js';
import GetValue from '../../../utils/object/GetValue.js';

var GetTileXYAtDirection = function (chess, directions, distance, out) {
    var srcTileXY = this.chessToTileXYZ(chess);
    if (!srcTileXY) {
        return null;
    }

    if (typeof (directions) === 'string') {
        if (directions.indexOf(',') === -1) {
            directions = parseInt(directions);
        } else {
            directions = directions.split(',');
        }
    }

    var isNumberDirection = (typeof (directions) === 'number');
    var isNumberDistance = (typeof (distance) === 'number');
    if (isNumberDirection && isNumberDistance) {
        // Return a single tileXY
        out = this.grid.getTileXYAtDirection(srcTileXY.x, srcTileXY.y, directions, distance, out);  // directions is a number, distance is a number, return a singl tileXY
        this.getWrapTileXY(out.x, out.y, out);
        if ((out.x == null) || (out.y == null)) {
            out = null;
        } else {
            out.direction = directions;
        }

    } else {
        // Return an array of tileXY
        if (out === undefined) {
            out = [];
        }
        if (directions == null) {
            directions = this.grid.allDirections;
        }

        var resultTileXY;
        if (isNumberDirection) {  // directions is a number, distance is an object or list
            if (IsPlainObject(distance)) {
                var endIdx = GetValue(distance, 'end', 1);
                var startIdx = GetValue(distance, 'start', (endIdx > 0) ? 1 : -1);
                var step = GetValue(distance, 'step', ((endIdx >= startIdx) ? 1 : -1));
                if (startIdx === endIdx) {
                    resultTileXY = this.getTileXYAtDirection(srcTileXY, directions, endIdx); // Return a single tileXY
                    if (resultTileXY !== null) {
                        out.push(resultTileXY);
                    }
                } else if (startIdx < endIdx) {
                    for (var i = startIdx; i <= endIdx; i += step) {
                        resultTileXY = this.getTileXYAtDirection(srcTileXY, directions, i); // Return a single tileXY
                        if (resultTileXY !== null) {
                            out.push(resultTileXY);
                        }
                    }
                } else {
                    for (var i = startIdx; i >= endIdx; i += step) {
                        resultTileXY = this.getTileXYAtDirection(srcTileXY, directions, i); // Return a single tileXY
                        if (resultTileXY !== null) {
                            out.push(resultTileXY);
                        }
                    }
                }
            } else { // Is array
                for (var i = 0, cnt = distance.length; i < cnt; i++) {
                    resultTileXY = this.getTileXYAtDirection(srcTileXY, directions, distance[i]);
                    if (resultTileXY !== null) {
                        out.push(resultTileXY);
                    }
                }
            }
        } else { // directions is a list
            for (var i = 0, cnt = directions.length; i < cnt; i++) {
                if (isNumberDistance) { // return a single tileXY
                    resultTileXY = this.getTileXYAtDirection(srcTileXY, directions[i], distance);
                    if (resultTileXY !== null) {
                        out.push(resultTileXY);
                    }
                } else { // append an array of tileXY
                    this.getTileXYAtDirection(srcTileXY, directions[i], distance, out);
                }

            }
        }
    }

    return out;
}
export default GetTileXYAtDirection;