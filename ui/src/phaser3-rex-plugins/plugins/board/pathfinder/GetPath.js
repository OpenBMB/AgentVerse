import GetNodePath from './astartsearch/GetNodePath.js';
var GetPath = function (endTileXY, out) {
    if (out === undefined) {
        out = [];
    }
    if (this.board === undefined) {
        return out;
    }
    var nodeManager = this.nodeManager;
    if (nodeManager === undefined) {
        return out;
    }
    var startNode = nodeManager.getNode(this.chessData.tileXYZ, false);
    var endNode = nodeManager.getNode(endTileXY, false);
    if ((startNode === null) || (endNode === null)) {
        return out;
    }
    var nodes = GetNodePath(startNode, endNode, this.pathMode);
    var node;
    for (var i = 0, cnt = nodes.length; i < cnt; i++) {
        node = nodes[i];
        out.push({
            x: node.x,
            y: node.y,
            cost: node.g
        });
    }
    return out;
}
export default GetPath;