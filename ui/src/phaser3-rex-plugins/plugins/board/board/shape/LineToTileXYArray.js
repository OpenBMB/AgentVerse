import DistanceBetween from '../../../utils/math/distance/DistanceBetween.js';
import Linear from '../../../utils/math/Linear.js';
import AreTileXYEqual from '../../utils/AreTileXYEqual.js';

var LineToTileXYArray = function (startX, startY, endX, endY, out) {
    if (typeof (startX) !== 'number') {
        var line = startX;
        out = startY;
        startX = line.x1;
        startY = line.y1;
        endX = line.x2;
        endY = line.y2;
    }

    if (out === undefined) {
        out = [];
    }

    var totalDistance = DistanceBetween(startX, startY, endX, endY);
    var gridSize = Math.min(this.grid.cellWidth, this.grid.cellHeight);
    var quantity = Math.ceil(totalDistance / (gridSize / 4)),
        t;
    var worldX, worldY;
    var preTileXY, tileXY;
    for (var i = 0; i <= quantity; i++) {
        t = i / quantity;
        worldX = Linear(startX, endX, t);
        worldY = Linear(startY, endY, t);
        tileXY = this.worldXYToTileXY(worldX, worldY);
        if (!this.contains(tileXY.x, tileXY.y)) {
            continue;
        }
        if (preTileXY && AreTileXYEqual(preTileXY, tileXY)) {
            continue;
        }

        out.push(tileXY);
        preTileXY = tileXY;
    }
    return out;
}
export default LineToTileXYArray;