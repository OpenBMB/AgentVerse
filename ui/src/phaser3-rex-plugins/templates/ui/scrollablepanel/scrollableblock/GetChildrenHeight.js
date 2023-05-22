import { GetDisplayHeight } from '../../../../plugins/utils/size/GetDisplaySize.js';

var GetChildrenHeight = function () {
    if (this.rexSizer.hidden) {
        return 0;
    }

    var result;
    var child = this.child,
        childConfig = child.rexSizer;
    if (childConfig.hidden) {
        result = 0;
    } else if (this.scrollMode === 0) { // scroll y   
        result = 0;
    } else { // scroll x
        result = (child.isRexSizer) ?
            Math.max(child.minHeight, child.childrenHeight) :
            (child.hasOwnProperty('minHeight')) ? child.minHeight : GetDisplayHeight(child);
    }

    return result;
}

export default GetChildrenHeight;