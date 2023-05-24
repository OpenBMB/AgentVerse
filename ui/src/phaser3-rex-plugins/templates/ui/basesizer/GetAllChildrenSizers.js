var GetAllChildrenSizers = function (out) {
    if (out === undefined) {
        out = [];
    }
    var startIdx = out.length;
    var children = this.getChildrenSizers(out);
    var endIdx = out.length;
    for (var i = startIdx; i < endIdx; i++) {
        children[i].getAllChildrenSizers(out);
    }

    return out;
}
export default GetAllChildrenSizers;