import CONST from './const.js';

const ODD_R = CONST.ODD_R;
const EVEN_R = CONST.EVEN_R;
const ODD_Q = CONST.ODD_Q;
const EVEN_Q = CONST.EVEN_Q;

var GetWorldXY = function (tileX, tileY, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globWorldXY;
    }

    var worldX = (tileX * this.width);
    var worldY = (tileY * this.height);
    switch (this.mode) {
        case ODD_R:
            if (tileY & 1) {
                worldX += this._halfWidth;
            }
            worldY *= 0.75;
            break;

        case EVEN_R:
            if (tileY & 1) {
                worldX -= this._halfWidth;
            }
            worldY *= 0.75;
            break;

        case ODD_Q:
            worldX *= 0.75;
            if (tileX & 1) {
                worldY += this._halfHeight;
            }
            break;
        case EVEN_Q:
            worldX *= 0.75;
            if (tileX & 1) {
                worldY -= this._halfHeight;
            }
            break;
    }
    worldX += this.x;
    worldY += this.y;
    out.x = worldX;
    out.y = worldY;
    return out;
}

var globWorldXY = {};

export default GetWorldXY;