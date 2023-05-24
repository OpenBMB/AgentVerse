import CONST from './const.js';

const PATH_MODE = CONST.PATH_MODE;
const INFINITY = CONST.INFINITY;  // undefined

var FindPath = function (endTileXY, movingPoints, isClosest, out) {
    if (isClosest === undefined) {
        isClosest = true;
    }
    if (out === undefined) {
        out = [];
    }
    if (this.board === null) { // chess is not in board
        return out;
    }
    if ((movingPoints !== INFINITY) && (movingPoints <= 0)) {
        return out;
    }

    var startTileXYZ = this.chessData.tileXYZ;
    this.aStarSearch(startTileXYZ, endTileXY, movingPoints, PATH_MODE);
    var nodeManager = this.nodeManager;
    var endNode = (isClosest) ? nodeManager.closestNode : nodeManager.getNode(endTileXY);
    if (endNode === null) {
        return out;
    }
    return this.getPath(endNode, out);
}
export default FindPath;