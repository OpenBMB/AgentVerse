var IsOverlapping = function (mainBoard, tileZ) {
    if (!mainBoard) {
        return false;
    }

    var gameObject;
    for (var uid in this.tileXYZMap) {
        gameObject = this.board.uidToChess(uid);
        if (mainBoard.isOverlappingPoint(gameObject.x, gameObject.y, tileZ)) {
            return true;
        }
    }
    return false;
}
export default IsOverlapping;