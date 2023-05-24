var GetNearestChildIndex = function (x, y) {
    var children = this.sizerChildren;
    if (children.length === 0) {
        return -1;
    }

    var nearestIndex = -1,
        minDistance = Infinity;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];

        var distance;
        if (this.orientation === 0) { // x
            distance = Math.abs(child.left - x);
        } else {
            distance = Math.abs(child.top - y);
        }

        if (minDistance > distance) {
            minDistance = distance;
            nearestIndex = i;
        }
    }

    // Check right bound of last child
    var child = children[children.length - 1];
    var distance;
    if (this.orientation === 0) { // x
        distance = Math.abs(child.right - x);
    } else {
        distance = Math.abs(child.bottom - y);
    }

    if (minDistance > distance) {
        minDistance = distance;
        nearestIndex = i + 1;
    }

    return nearestIndex;
}

export default GetNearestChildIndex;