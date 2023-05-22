import {
    cr2cube,
    cube2cr
} from './CubeTransfer.js';

import Wrap from '../../math/Wrap.js';

var Rotate = function (src, dir, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globTileXY;
    }

    dir = Wrap(dir, 0, 5);
    var cubeXYZ = cr2cube(this.mode, src.x, src.y, true);
    var newCubeX, newCubeY, newCubeZ;
    switch (dir) {
        case 1:
            newCubeX = -cubeXYZ.z;
            newCubeY = -cubeXYZ.x;
            newCubeZ = -cubeXYZ.y;
            break;
        case 2:
            newCubeX = cubeXYZ.y;
            newCubeY = cubeXYZ.z;
            newCubeZ = cubeXYZ.x;
            break;
        case 3:
            newCubeX = -cubeXYZ.x;
            newCubeY = -cubeXYZ.y;
            newCubeZ = -cubeXYZ.z;
            break;
        case 4:
            newCubeX = cubeXYZ.z;
            newCubeY = cubeXYZ.x;
            newCubeZ = cubeXYZ.y;
            break;
        case 5:
            newCubeX = -cubeXYZ.y;
            newCubeY = -cubeXYZ.z;
            newCubeZ = -cubeXYZ.x;
            break;
        default:
            newCubeX = cubeXYZ.x;
            newCubeY = cubeXYZ.y;
            newCubeZ = cubeXYZ.z;
            break;
    }

    cube2cr(this.mode, newCubeX, newCubeY, newCubeZ, out);
    return out;
}

var globTileXY = {};
export default Rotate;