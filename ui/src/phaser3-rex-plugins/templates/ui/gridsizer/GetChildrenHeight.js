import { GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';
import Sum from '../../../plugins/utils/math/Sum.js';

var GetChildrenHeight = function (minimumMode) {
    if (this.rexSizer.hidden) {
        return 0;
    }

    if (minimumMode === undefined) {
        minimumMode = true;
    }

    var result = 0,
        rowHeight;
    var children = this.sizerChildren;
    var child, padding, childHeight, proportion;

    for (var i = 0; i < this.rowCount; i++) {
        proportion = this.rowProportions[i];
        rowHeight = 0;
        if ((proportion === 0) || minimumMode) {
            for (var j = 0; j < this.columnCount; j++) {
                child = children[(i * this.columnCount) + j];
                if (!child) {
                    continue;
                }
                if (child.rexSizer.hidden) {
                    continue;
                }

                childHeight = (child.isRexSizer) ?
                    Math.max(child.minHeight, child.childrenHeight) :
                    (child.hasOwnProperty('minHeight')) ? child.minHeight : GetDisplayHeight(child);
                padding = child.rexSizer.padding;
                childHeight += (padding.top + padding.bottom);
                rowHeight = Math.max(rowHeight, childHeight);
            }
            result += rowHeight;
        }
        // else,(proportion > 0) : rowHeight is 0
        this.rowHeight[i] = rowHeight;
    }

    var space = this.space;
    var indentTop = Math.max(space.indentTopOdd, space.indentTopEven);
    return result + Sum(space.top, indentTop, ...space.row, space.bottom);
}

export default GetChildrenHeight;