import RotateTransfer from './transferfunctions/Rotate.js';
import ResetChessTileXYZ from './ResetChessTileXYZ.js';

var Rotate = function (direction) {
    if (direction === 0) {
        return this;
    }

    var isOnMainBoard = (this.mainBoard != null);
    if (isOnMainBoard) {
        this.pullOutFromMainBoard();
    }

    var newTileXYZMap = RotateTransfer.call(this, direction);

    if (isOnMainBoard) {
        var mainBoard = this.lastMainBoardRef.mainBoard;
        var tileX = this.lastMainBoardRef.tileX;
        var tileY = this.lastMainBoardRef.tileY;
        this.lastTransferResult = this.canPutOnMainBoard(mainBoard, tileX, tileY, newTileXYZMap);
        if (this.lastTransferResult) {
            ResetChessTileXYZ.call(this, newTileXYZMap);
        }
        this.putBack();
    } else {
        this.lastTransferResult = true;
        ResetChessTileXYZ.call(this, newTileXYZMap);
    }

    if (this.lastTransferResult) {
        this.setFace(this.face + direction);
    }
    return this;
}
export default Rotate;