import IsFunction from '../../../plugins/utils/object/IsFunction.js';
import IsArray from '../../../plugins/utils/object/IsArray.js';
import ContainsPoint from '../utils/ContainsPoint.js';

var PointToChild = function (x, y, preTest, postTest, children) {
    if (!IsFunction(preTest)) {
        children = preTest;
        preTest = undefined;
        postTest = undefined;
    }

    if (children === undefined) {
        if (this.sizerChildren) {
            children = this.sizerChildren;
        } else {
            children = this.children;
        }
    }

    if (IsArray(children)) {
        var child;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            if (ContainsPoint(child, x, y, preTest, postTest)) {
                return child;
            }
        }
    } else {
        var child;
        for (var key in children) {
            child = children[key];
            if (ContainsPoint(child, x, y, preTest, postTest)) {
                return child;
            }
        }
    }

    return null;
}

export default PointToChild;