import CONST from './const.js';

const AREA_MODE = CONST.AREA_MODE;
const INFINITY = CONST.INFINITY;  // undefined

var FindArea = function (movingPoints, out) {
    if (out === undefined) {
        out = [];
    }
    if (this.board === null) { // chess is not in board
        return out;
    }
    if ((movingPoints !== INFINITY) && (movingPoints <= 0)) {
        return out;
    }

    var startTileXYZ = this.chessData.tileXYZ,
        startTileX = startTileXYZ.x,
        startTileY = startTileXYZ.y;
    this.aStarSearch(startTileXYZ, null, movingPoints, AREA_MODE);
    // output : this.nodeManager.getAllNodes()
    var nodes = this.nodeManager.getAllNodes(),
        node, nodesList = [];
    for (var key in nodes) {
        node = nodes[key];
        // not include start node
        if ((node.x === startTileX) && (node.y === startTileY)) {
            continue;
        }
        // not include open node
        if (!node.closed) {
            continue;
        }
        nodesList.push(node);
    }
    // sort by sn (creating order)
    nodesList.sort(function (nodeA, nodeB) {
        var snA = nodeA.sn;
        var snB = nodeB.sn;
        return (snA > snB) ? 1 :
            (snA < snB) ? -1 :
            0;
    });
    for (var i = 0, cnt = nodesList.length; i < cnt; i++) {
        node = nodesList[i];
        out.push({
            x: node.x,
            y: node.y,
            cost: node.g
        });
    }
    return out;
}
export default FindArea;