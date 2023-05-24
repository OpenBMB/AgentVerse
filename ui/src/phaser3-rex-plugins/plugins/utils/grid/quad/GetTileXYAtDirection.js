import {
    OrthogonalMap,
    IsometricMap
} from './DistanceToDeltaTileXY.js';

var GetTileXAtDirection = function (tileX, tileY, direction, distance, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globTileXY;
    }

    var deltaTileX, deltaTileY;
    switch (this.mode) {
        case 0: // orthogonal
            deltaTileX = OrthogonalMap[direction][0];
            deltaTileY = OrthogonalMap[direction][1];
            break;
        case 1: // isometric
            deltaTileX = IsometricMap[direction][0];
            deltaTileY = IsometricMap[direction][1];
            break;
    }

    out.x = tileX + (distance * deltaTileX);
    out.y = tileY + (distance * deltaTileY);

    return out;
}

var globTileXY = {};

export default GetTileXAtDirection;