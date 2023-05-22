import {
    cube2cr
} from '../../utils/grid/hexagon/CubeTransfer.js';

var GetTriangleMap = function (board, type, height, out) {
    if (out === undefined) {
        out = [];
    }
    var mode = board.grid.mode;
    var rStart, rEnd
    for (var q = 0; q <= height; q++) {
        if (type === 1) {
            rStart = height - q;
            rEnd = height;
        } else {
            rStart = 0;
            rEnd = height - q;
        }

        for (var r = rStart; r <= rEnd; r++) {
            out.push(cube2cr(mode, q, r, -q - r));
        }
    }

    return out;
}

export default GetTriangleMap;