var OffsetChildren = function (children, offsetX, offsetY) {
    if ((offsetX === 0) && (offsetY === 0)) {
        return;
    }

    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (!child.renderable) {
            continue;
        }

        child.x += offsetX;
        child.y += offsetY;
    }
}

export default OffsetChildren;