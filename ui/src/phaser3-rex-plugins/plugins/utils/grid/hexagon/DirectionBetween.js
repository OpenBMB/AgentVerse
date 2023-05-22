import {
    cr2cube
} from './CubeTransfer.js';

var DirectionBetween = function (tileA, tileB, round) {
    if (round === undefined) {
        round = true;
    }

    var direction;
    cr2cube(this.mode, tileA.x, tileA.y, globCubeA);
    cr2cube(this.mode, tileB.x, tileB.y, globCubeB);
    var dx = globCubeB.x - globCubeA.x;
    var dy = globCubeB.y - globCubeA.y;
    var dz = globCubeB.z - globCubeA.z;
    if (dz === 0) {
        direction = (dx > 0) ? 0 : 3;
    } else if (dx === 0) {
        direction = (dz > 0) ? 1 : 4;
    } else if (dy === 0) {
        direction = (dz > 0) ? 2 : 5;
    } else if ((dx > 0) && (dy < 0) && (dz > 0)) { // 0~1
        direction = 0 + (dz / (-dy));
    } else if ((dx < 0) && (dy < 0) && (dz > 0)) { // 1~2
        direction = 1 + ((-dy) / dz);
    } else if ((dx < 0) && (dy > 0) && (dz > 0)) { // 2~3
        direction = 2 + (dy / (-dx));
    } else if ((dx < 0) && (dy > 0) && (dz < 0)) { // 3~4
        direction = 3 + ((-dz) / dy);
    } else if ((dx > 0) && (dy > 0) && (dz < 0)) { // 4~5
        direction = 4 + (dx / (-dz));
    } else { // ((dx > 0) && (dy < 0) && (dz < 0)) // 5~0
        direction = 5 + ((-dy) / dx);
    }

    if (round) {
        direction = Math.round(direction);
    }
    return direction;
}

var globCubeA = {};
var globCubeB = {};
export default DirectionBetween;