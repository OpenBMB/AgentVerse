import { GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';

var GetMaxChildHeight = function (children) {
    if (children === undefined) {
        children = this.sizerChildren;
    }
    var result = 0;
    var child, childHeight;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (child === '\n') {
            continue;
        }

        childHeight = (child.isRexSizer) ?
            Math.max(child.minHeight, child.childrenHeight) :
            (child.hasOwnProperty('minHeight')) ? child.minHeight : GetDisplayHeight(child);
        result = Math.max(childHeight, result);
    }
    return result;
}
export default GetMaxChildHeight;