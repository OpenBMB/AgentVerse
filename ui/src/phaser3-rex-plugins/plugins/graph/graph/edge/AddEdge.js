import GetGraphItem from '../../graphitem/GetGraphItem.js';

const DIRAtoB = 1;
const DIRBtoA = 2;
const DIRMODE = {
    '->': DIRAtoB,
    '<-': DIRBtoA,
    '<->': (DIRAtoB | DIRBtoA),
};

var AddEdge = function (edgeGO, vAGO, vBGO, dir) {
    if (this.isEdge(edgeGO)) {
        return this;
    }

    if (dir === undefined) {
        dir = 3;
    }

    // Configure edge
    var edgeUid = this.getObjUID(edgeGO);
    var edge = this.getEdgeData(edgeUid, true);
    edge.dir = dir;
    edge.vA = this.getObjUID(vAGO);
    edge.vB = this.getObjUID(vBGO);
    GetGraphItem(edgeGO).setGraph(this);
    this.edgeCount++;

    // Configure vertice
    this.addVertex(vAGO).addVertex(vBGO);
    var vA = this.getVertexData(vAGO, true);
    var vB = this.getVertexData(vBGO, true);
    if (typeof (dir) === 'string') {
        dir = DIRMODE(dir);
    }
    if (dir & DIRAtoB) {
        vA[edgeUid] = edge.vB;
    }
    if (dir & DIRBtoA) {
        vB[edgeUid] = edge.vA;
    }
    return this;
}

export default AddEdge;