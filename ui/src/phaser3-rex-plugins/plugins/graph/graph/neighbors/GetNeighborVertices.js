import UidToObj from '../../graphitem/UidToObj.js';

var GetNeighborVertices = function (vAGO, out) {
    if (out === undefined) {
        out = [];
    }

    var vertex = this.getVertexData(vAGO),
        vBGO;
    if (vertex) {
        for (var edgeUid in vertex) {
            vBGO = UidToObj(vertex[edgeUid]);
            if (vBGO) {
                out.push(vBGO);
            }
        }
    }
    return out;
};

export default GetNeighborVertices;