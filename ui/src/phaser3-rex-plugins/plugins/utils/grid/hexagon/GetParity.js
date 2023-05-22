import CONST from './const.js';

const ODD_R = CONST.ODD_R;
const EVEN_R = CONST.EVEN_R;
const ODD_Q = CONST.ODD_Q;
const EVEN_Q = CONST.EVEN_Q;

var GetParity = function(mode, tileX, tileY) {
    var parity;
    switch (mode) {
        case ODD_R:
        case EVEN_R:
            parity = tileY & 1;
            break;

        case ODD_Q:
        case EVEN_Q:
            parity = tileX & 1;
            break;
    }
    return parity;
}
export default GetParity;