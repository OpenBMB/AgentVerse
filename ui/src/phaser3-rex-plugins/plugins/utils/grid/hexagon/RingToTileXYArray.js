import {
    cr2cube,
    cube2cr
} from './CubeTransfer.js';

var RingToTileXYArray = function (centerTileXY, radius, out) {
    if (out === undefined) {
        out = [];
    }

    var centerCube = cr2cube(this.mode, centerTileXY.x, centerTileXY.y, true);
    var cx = centerCube.x,
        cy = centerCube.y,
        cz = centerCube.z;
    var i, j, k;

    k = radius;
    for (i = 0; i >= -radius; i--) {
        j = -i - k;
        out.push(cube2cr(this.mode, cx + i, cy + j, cz + k));
    }

    i = -radius;
    for (j = 1; j <= radius; j++) {
        k = -i - j;
        out.push(cube2cr(this.mode, cx + i, cy + j, cz + k));
    }

    j = radius;
    for (k = -1; k >= -radius; k--) {
        i = -j - k;
        out.push(cube2cr(this.mode, cx + i, cy + j, cz + k));
    }

    k = -radius;
    for (i = 1; i <= radius; i++) {
        j = -i - k;
        out.push(cube2cr(this.mode, cx + i, cy + j, cz + k));
    }

    i = radius;
    for (j = -1; j >= -radius; j--) {
        k = -i - j;
        out.push(cube2cr(this.mode, cx + i, cy + j, cz + k));
    }

    j = -radius;
    for (k = 1; k <= radius - 1; k++) {
        i = -j - k;
        out.push(cube2cr(this.mode, cx + i, cy + j, cz + k));
    }
    return out;
}

export default RingToTileXYArray;