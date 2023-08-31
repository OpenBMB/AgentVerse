import { GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';

var GetChildrenHeight = function () {
    if (this.rexSizer.hidden) {
        return 0;
    }

    var result = 0;
    var children = this.sizerChildren;
    var child, padding, childHeight;
    for (var key in children) {
        child = children[key];
        childHeight = (child.isRexSizer) ?
            Math.max(child.minHeight, child.childrenHeight) :
            (child.minHeight !== undefined) ? child.minHeight : GetDisplayHeight(child);

        padding = child.rexSizer.padding;
        childHeight += (padding.top + padding.bottom);
        result = Math.max(childHeight, result);
    }
    return result + this.space.top + this.space.bottom;
}

export default GetChildrenHeight;