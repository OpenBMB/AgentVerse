import UidToObj from '../../graphitem/UidToObj.js';

var GetOppositeVertex = function (vertexGameObject, edgeGameObject) {
    // uid or game object
    var vertex = this.getVertexData(vertexGameObject);
    if (!vertex) {
        return undefined;
    }

    var edgeUid = this.getObjUID(edgeGameObject);
    if (!edgeUid) {
        return undefined;
    }

    return UidToObj(vertex[edgeUid]);
};

export default GetOppositeVertex;