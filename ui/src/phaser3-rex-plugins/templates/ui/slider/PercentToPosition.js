const Linear = Phaser.Math.Linear;

var PercentToPosition = function (t, startPoint, endPoint, out) {
    if (out === undefined) {
        out = tmpOut;
    }
    out.x = Linear(startPoint.x, endPoint.x, t);
    out.y = Linear(startPoint.y, endPoint.y, t);
    return out;
}
var tmpOut = {};

export default PercentToPosition;