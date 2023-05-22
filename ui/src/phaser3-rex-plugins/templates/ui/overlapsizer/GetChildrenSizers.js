var GetChildrenSizers = function (out) {
    if (out === undefined) {
        out = [];
    }
    var children = this.sizerChildren,
        child;
    for (var key in children) {
        child = children[key];
        if (child.isRexSizer) {
            out.push(child);
        }
    }
    return out;
}
export default GetChildrenSizers;