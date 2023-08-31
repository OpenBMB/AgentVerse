import CONST from '../const.js';
import RandomInt from '../../../utils/math/Between.js';

const RANDOM = CONST['random'];
const DIAGONAL = CONST['diagonal'];
const STRAIGN = CONST['straight'];
const LINE = CONST['line'];
const ASTAR = CONST['A*'];
const ASTAR_LINE = CONST['A*-line'];
const ASTAR_RANDOM = CONST['A*-random'];


var GetNodePath = function (startNode, endNode, pathMode) {
    var board = startNode.board;

    var curDir, preNodeDir; // DIAGONAL, STRAIGN
    var targetAngle; // LINE

    var curNode = endNode,
        preNode, preNodeKeysCnt;
    var path = [];
    while (curNode.preNodes.length > 0) {
        path.push(curNode);
        preNodeKeysCnt = curNode.preNodes.length;

        switch (pathMode) {
            case ASTAR:
            case ASTAR_LINE:
            case ASTAR_RANDOM:
                preNode = curNode.preNodes[0];
                curNode = preNode;
                break;

            case RANDOM:
                preNode = (preNodeKeysCnt === 1) ? curNode.preNodes[0] : curNode.preNodes[RandomInt(0, preNodeKeysCnt - 1)];
                curNode = preNode;
                break;

            case DIAGONAL:
                for (var i = 0; i < preNodeKeysCnt; i++) {
                    preNode = curNode.preNodes[i];
                    preNodeDir = board.getNeighborTileDirection(curNode, preNode);
                    if (preNodeDir !== curDir) {
                        curDir = preNodeDir;
                        break;
                    }
                }
                curNode = preNode;
                break;

            case STRAIGN:
                for (i = 0; i < preNodeKeysCnt; i++) {
                    preNode = curNode.preNodes[i];
                    preNodeDir = board.getNeighborTileDirection(curNode, preNode);
                    if (preNodeDir === curDir) {
                        break;
                    }
                }
                curDir = preNodeDir;
                curNode = preNode;
                break;

            case LINE:
                if (targetAngle === undefined) {
                    targetAngle = endNode.angleTo(startNode);
                }
                if (preNodeKeysCnt === 1) {
                    preNode = curNode.preNodes[0];
                    curNode = preNode;
                    targetAngle = endNode.angleTo(curNode);
                } else {
                    preNode = curNode.preNodes[0];
                    var deltaAngle = Math.abs(endNode.angleTo(preNode) - targetAngle);
                    var preNodeB, deltaAngleB;
                    for (var i = 1; i < preNodeKeysCnt; i++) {
                        preNodeB = curNode.preNodes[i];
                        deltaAngleB = Math.abs(endNode.angleTo(preNodeB) - targetAngle);
                        if (deltaAngleB < deltaAngle) {
                            preNode = preNodeB;
                        }
                    }
                    curNode = preNode;
                }
                break;
        }
    }
    return path.reverse();
}
export default GetNodePath;