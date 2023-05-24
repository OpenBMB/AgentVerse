var PutBack = function () {
    var mainBoard = this.lastMainBoardRef.mainBoard;
    var tileX = this.lastMainBoardRef.tileX;
    var tileY = this.lastMainBoardRef.tileY;
    this.putOnMainBoard(mainBoard, tileX, tileY, false);
    return this;
}
export default PutBack;