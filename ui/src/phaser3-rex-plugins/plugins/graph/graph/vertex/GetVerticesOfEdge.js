import UidToObj from '../../graphitem/UidToObj.js';

var GetVerticesOfEdge = function (edgeGameObject, out) {
    if (out === undefined) {
        out = [];
    }

    // uid or game object
    var edge = this.getEdgeData(edgeGameObject);
    if (!edge) {
        return out;
    }

    var vGO;
    vGO = UidToObj(edge.vA);
    if (vGO) {
        out.push(vGO);
    }
    vGO = UidToObj(edge.vB);
    if (vGO) {
        out.push(vGO);
    }
    return out;
};

export default GetVerticesOfEdge;