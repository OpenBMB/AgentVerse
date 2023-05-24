import RotateTransfer from './transferfunctions/Rotate.js';

var CanRotate = function (direction) {
    if (this.mainBoard === null) {
        return true;
    }
    var newTileXYZMap = RotateTransfer.call(this, direction);
    return this.canPutOnMainBoard(this.mainBoard, tileX, tileY, newTileXYZMap);
}
export default CanRotate;