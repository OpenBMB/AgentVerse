import PositionToPercent from './PositionToPercent.js';

var OnDragThumb = function (pointer, dragX, dragY) {
    if (!this.enable) {
        return;
    }
    tmpPoint.x = dragX;
    tmpPoint.y = dragY;

    var startPoint, endPoint;
    if (!this.reverseAxis) {
        startPoint = this.getStartPoint();
        endPoint = this.getEndPoint();
    } else {
        startPoint = this.getEndPoint();
        endPoint = this.getStartPoint();
    }
    this.value = PositionToPercent(startPoint, endPoint, tmpPoint);
}
var tmpPoint = {};

export default OnDragThumb;