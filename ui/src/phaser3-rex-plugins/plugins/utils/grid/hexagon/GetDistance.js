import {
    cr2cube
} from './CubeTransfer.js';

var GetDistance = function (tileA, tileB, roughMode) {
    cr2cube(this.mode, tileA.x, tileA.y, globCubeA);
    cr2cube(this.mode, tileB.x, tileB.y, globCubeB);
    var dx = globCubeB.x - globCubeA.x;
    var dy = globCubeB.y - globCubeA.y;
    var dz = globCubeB.z - globCubeA.z;
    return (Math.abs(dx) + Math.abs(dy) + Math.abs(dz)) / 2;
}

var globCubeA = {};
var globCubeB = {};

export default GetDistance;