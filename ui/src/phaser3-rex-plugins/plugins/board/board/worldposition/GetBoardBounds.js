import Rectangle from '../../../utils/geom/rectangle/Rectangle.js';
import Union from '../../../utils/geom/rectangle/Union.js';

var GetBoardBounds = function (out) {
    if (out === undefined) {
        out = new Rectangle();
    } else if (out === true) {
        out = globalBounds;
    }

    var isFirstTile = true;
    this.forEachTileXY(function (tileXY, board) {
        var tileBounds = board.getGridBounds(tileXY.x, tileXY.y, true);
        if (isFirstTile) {
            out.setTo(tileBounds.x, tileBounds.y, tileBounds.width, tileBounds.height);
            isFirstTile = false;
        } else {
            out = Union(out, tileBounds, out);
        }
    });

    return out;
}

var globalBounds = new Rectangle();

export default GetBoardBounds;