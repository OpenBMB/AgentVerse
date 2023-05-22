var SetMainBoard = function (mainBoard, tileX, tileY) {
    this.mainBoardRef.set(mainBoard, tileX, tileY);
    if (mainBoard) {
        this.lastMainBoardRef.set(mainBoard, tileX, tileY);
    }
    return this;
}
export default SetMainBoard;