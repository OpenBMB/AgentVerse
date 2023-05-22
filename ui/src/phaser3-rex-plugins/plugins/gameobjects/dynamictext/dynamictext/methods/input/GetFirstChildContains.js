var GetFirstChildContains = function (children, x, y) {
    var children = children;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (!child.active || !child.renderable) {
            continue;
        }
        if (child.contains(x, y)) {
            return child;
        }
    }
    return null;
}

export default GetFirstChildContains;