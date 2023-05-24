var GetChildrenProportion = function () {
    var result = 0;
    var children = this.sizerChildren;
    var child, proportion;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (child.rexSizer.hidden) {
            continue;
        }
        proportion = child.rexSizer.proportion;
        if (proportion > 0) {
            result += proportion;
        }
    }
    return result;
}
export default GetChildrenProportion;