import UidToObj from '../../graphitem/UidToObj.js';

var GetAllEdges = function (out) {
    if (out === undefined) {
        out = [];
    }

    var edgeGO;
    for (var edgeUid in this.edges) {
        edgeGO = UidToObj(edgeUid);
        if (edgeGO) {
            out.push(edgeGO);
        }
    }
    return out;
};

export default GetAllEdges;