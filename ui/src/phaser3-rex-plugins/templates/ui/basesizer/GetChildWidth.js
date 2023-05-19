import { GetDisplayWidth } from '../../../plugins/utils/size/GetDisplaySize.js';

var GetChildWidth = function (child) {
    var childWidth;
    if (child.isRexSizer) { // Sizer game object
        childWidth = Math.max(child.minWidth, child.childrenWidth);
    } else {  // Normal game object
        if (child.minWidth !== undefined) {  // Force minWidth
            childWidth = child.minWidth;
        } else {
            childWidth = GetDisplayWidth(child);
        }
    }

    return childWidth;
}

export default GetChildWidth;