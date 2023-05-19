import ContainsPoint from '../ContainsPoint.js';

var PointToChild = function (parents, x, y) {
    var parent;
    for (var i = 0, cnt = parents.length; i < cnt; i++) {
        parent = parents[i];
        if (!ContainsPoint(parent, x, y)) {
            continue;
        }

        return parent.pointToChild(x, y);
    }
    return null;
}
export default PointToChild;