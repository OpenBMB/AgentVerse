import {
    cube2cr
} from '../../utils/grid/hexagon/CubeTransfer.js';

var GetParallelogramMap = function (board, type, width, height, out) {
    if (out === undefined) {
        out = [];
    }
    var mode = board.grid.mode;
    switch (type) {
        case 1:
            for (var s = 0; s <= width; s++) {
                for (var q = 0; q <= height; q++) {
                    out.push(cube2cr(mode, q, -q - s, s));
                }
            }
            break;
        case 2:
            for (var r = 0; r <= width; r++) {
                for (var s = 0; s <= height; s++) {
                    out.push(cube2cr(mode, -r - s, r, s));
                }
            }
            break;
        default: // case 0
            for (var q = 0; q <= width; q++) {
                for (var r = 0; r <= height; r++) {
                    out.push(cube2cr(mode, q, r, -q - r));
                }
            }
            break;
    }

    return out;
}
export default GetParallelogramMap;