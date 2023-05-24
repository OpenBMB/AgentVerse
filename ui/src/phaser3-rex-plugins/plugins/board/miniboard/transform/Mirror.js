import MirrorTransfer from './transferfunctions/Mirror.js';
import ResetChessTileXYZ from './ResetChessTileXYZ.js';

var Mirror = function (mode) {
    var isOnMainBoard = (this.mainBoard != null);
    if (isOnMainBoard) {
        this.pullOutFromMainBoard();
    }

    var newTileXYZMap = MirrorTransfer.call(this, mode);

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
    return this;
}
export default Mirror;