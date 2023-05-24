import UidToObj from '../../graphitem/UidToObj.js';

var GetEdgesOfVertex = function (vertexGameObject, out) {
    if (out === undefined) {
        out = [];
    }

    var vertex = this.getVertexData(vertexGameObject);
    if (!vertex) {
        return out;
    }

    var edgeGO;
    for (var edgeUid in vertex) {
        edgeGO = UidToObj(edgeUid);
        if (edgeGO) {
            out.push(edgeGO);
        }
    }
    return out;
};

export default GetEdgesOfVertex;