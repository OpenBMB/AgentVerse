var PullOutFromMainBoard = function () {
    var mainBoard = this.mainBoard;
    if (mainBoard === null) {
        return this;
    }

    var tileXYZMap = this.tileXYZMap; // {uid:{x,y,z}}
    for (var uid in tileXYZMap) {
        mainBoard.removeChess(parseInt(uid));
    }
    this.setMainBoard(null);
    return this;
}
export default PullOutFromMainBoard;