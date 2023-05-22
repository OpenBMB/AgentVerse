import MirrorTransfer from './transferfunctions/Mirror.js';
var CanMirror = function(mode) {
    if (this.mainBoard === null) {
        return true;
    }
    var newTileXYZMap = MirrorTransfer.call(this, mode);
    return this.canPutOnMainBoard(this.mainBoard, tileX, tileY, newTileXYZMap);
}
export default CanMirror;