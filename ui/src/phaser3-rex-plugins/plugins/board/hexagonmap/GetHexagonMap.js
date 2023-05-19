import {
    cube2cr
} from '../../utils/grid/hexagon/CubeTransfer.js';

var GetHexagonMap = function (board, radius, out) {
    if (out === undefined) {
        out = [];
    }
    var mode = board.grid.mode;
    var r1, r2;
    for (var q = -radius; q <= radius; q++) {
        r1 = Math.max(-radius, -q - radius);
        r2 = Math.min(radius, -q + radius);
        for (var r = r1; r <= r2; r++) {
            out.push(cube2cr(mode, q, r, -q - r));
        }
    }

    return out;
}
export default GetHexagonMap;