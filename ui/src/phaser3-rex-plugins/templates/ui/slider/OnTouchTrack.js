import PositionToPercent from './PositionToPercent.js';

var OnTouchTrack = function (pointer, localX, localY) {
    if (!this.enable) {
        return;
    }
    if (!pointer.isDown) {
        return;
    }

    tmpPoint.x = pointer.worldX;
    tmpPoint.y = pointer.worldY;

    var startPoint, endPoint;
    if (!this.reverseAxis) {
        startPoint = this.getStartPoint();
        endPoint = this.getEndPoint();
    } else {
        startPoint = this.getEndPoint();
        endPoint = this.getStartPoint();
    }
    var value = PositionToPercent(startPoint, endPoint, tmpPoint);

    this.stopEaseValue();
    if ((this.easeValueDuration === 0) || (Math.abs(this.value - value) < 0.1)) {
        this.value = value;
    } else {
        this.easeValueTo(value);
    }
}
var tmpPoint = {};

export default OnTouchTrack;