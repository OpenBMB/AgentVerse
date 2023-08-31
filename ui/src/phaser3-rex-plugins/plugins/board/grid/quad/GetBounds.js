import Rectangle from '../../../utils/geom/rectangle/Rectangle.js';

var GetBounds = function (tileX, tileY, out) {
    if (out === undefined) {
        out = new Rectangle;
    } else if (out === true) {
        out = globalBounds;
    }

    var worldXY = this.getWorldXY(tileX, tileY, true);
    out.x = worldXY.x - (this.width * 0.5);
    out.y = worldXY.y - (this.height * 0.5);
    out.width = this.width;
    out.height = this.height;

    return out;
}

var globalBounds = new Rectangle();

export default GetBounds;