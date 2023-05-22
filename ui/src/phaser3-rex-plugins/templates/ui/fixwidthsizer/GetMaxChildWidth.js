var GetMaxChildWidth = function (children) {
    if (children === undefined) {
        children = this.sizerChildren;
    }
    var result = 0;
    var child, childWidth;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (child === '\n') {
            continue;
        }

        childWidth = this.getChildWidth(child);
        result = Math.max(childWidth, result);
    }
    return result;
}
export default GetMaxChildWidth;