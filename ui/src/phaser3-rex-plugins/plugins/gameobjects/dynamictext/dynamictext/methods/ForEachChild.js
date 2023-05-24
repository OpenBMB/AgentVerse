var ForEachChild = function (callback, scope, activeOnly) {
    if (activeOnly === undefined) {
        activeOnly = true;
    }

    var children = this.children;
    var childIndex = 0;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];

        if (activeOnly && !child.active) {
            continue;
        }

        var isBreak;
        if (scope) {
            isBreak = callback.call(this, child, childIndex, children);
        } else {
            isBreak = callback(child, childIndex, children);
        }
        childIndex++;

        if (isBreak) {
            break;
        }
    }

    return this;
}

export default ForEachChild;