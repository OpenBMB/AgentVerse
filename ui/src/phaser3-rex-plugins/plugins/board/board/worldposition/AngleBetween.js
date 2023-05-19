import GetAngle from '../../../utils/math/angle/Between.js';

var AngleBetween = function (tileA, tileB) {
    tileA = this.chessToTileXYZ(tileA);
    tileB = this.chessToTileXYZ(tileB);
    var out = this.tileXYToWorldXY(tileA.x, tileA.y, true);
    var x0 = out.x;
    var y0 = out.y;
    out = this.tileXYToWorldXY(tileB.x, tileB.y, true);
    var x1 = out.x;
    var y1 = out.y;
    return GetAngle(x0, y0, x1, y1); // -PI~PI
}

export default AngleBetween;