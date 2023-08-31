var DepthFirstSearch = function (root, callback) {
    var skip = callback(root);
    if ((!skip) && root.isRexContainerLite) {
        var children = root.children;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            DepthFirstSearch(children[i], callback);
        }
    }
}

var BreadthFirstSearch = function (root, callback) {
    var queue = [root];
    while (queue.length > 0) {
        var current = queue.shift();
        var skip = callback(current);

        if ((!skip) && current.isRexContainerLite) {
            queue.push(...current.children);
        }
    }
}

export {
    DepthFirstSearch,
    BreadthFirstSearch
};