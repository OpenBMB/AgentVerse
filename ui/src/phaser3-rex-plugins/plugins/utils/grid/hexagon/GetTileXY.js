import CONST from './const.js';
import {
    qr2cube,
    roundcube,
    cube2cr,
} from './CubeTransfer.js';

const ODD_R = CONST.ODD_R;
const EVEN_R = CONST.EVEN_R;
const ODD_Q = CONST.ODD_Q;
const EVEN_Q = CONST.EVEN_Q;

const C4DIV3 = (4 / 3);
const C2DIV3 = (2 / 3);

var GetTileXY = function (worldX, worldY, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globTileXY;
    }

    worldX -= this.x;
    worldY -= this.y;
    var q, r;
    switch (this.mode) {
        case ODD_R:
        case EVEN_R:
            r = (worldY * C4DIV3) / this.height;
            q = (worldX / this.width) - C2DIV3 * (worldY / this.height);
            break;

        case ODD_Q:
        case EVEN_Q:
            r = (worldY / this.height) - C2DIV3 * (worldX / this.width);
            q = (worldX * C4DIV3) / this.width;
            break;
    }

    var cube = qr2cube(q, r, globCube);
    roundcube(cube);
    cube2cr(this.mode, cube.x, cube.y, cube.z, out);
    return out;
}

var globCube = {};
var globTileXY = {};

export default GetTileXY;