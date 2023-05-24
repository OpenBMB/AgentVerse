import Wrap from '../../../utils/math/Wrap.js';

var GetWrapTileXY = function (tileX, tileY, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globTileXY;
    }

    if (this.wrapMode) {
        tileX = Wrap(tileX, 0, this.width);
    } else if ((!this.infinityMode) &&
        ((tileX < 0) || (tileX >= this.width))) {
        tileX = null;
    }
    if (this.wrapMode) {
        tileY = Wrap(tileY, 0, this.height);
    } else if ((!this.infinityMode) &&
        ((tileY < 0) || (tileY >= this.height))) {
        tileY = null;
    }
    out.x = tileX;
    out.y = tileY;
    return out;
}

var globTileXY = {};

export default GetWrapTileXY;