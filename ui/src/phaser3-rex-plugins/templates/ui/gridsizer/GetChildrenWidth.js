import Sum from '../../../plugins/utils/math/Sum.js';

var GetChildrenWidth = function (minimumMode) {
    if (this.rexSizer.hidden) {
        return 0;
    }

    if (minimumMode === undefined) {
        minimumMode = true;
    }

    var result = 0,
        columnWidth;
    var children = this.sizerChildren;
    var child, padding, childWidth, proportion;

    for (var i = 0; i < this.columnCount; i++) {
        proportion = this.columnProportions[i];
        columnWidth = 0;
        if ((proportion === 0) || minimumMode) {
            for (var j = 0; j < this.rowCount; j++) {
                child = children[(j * this.columnCount) + i];
                if (!child) {
                    continue;
                }
                if (child.rexSizer.hidden) {
                    continue;
                }

                padding = child.rexSizer.padding;
                childWidth = this.getChildWidth(child) + padding.left + padding.right;
                columnWidth = Math.max(columnWidth, childWidth);
            }
            result += columnWidth;
        }
        // else,(proportion > 0) : columnWidth is 0
        this.columnWidth[i] = columnWidth;
    }

    var space = this.space;
    var indentLeft = Math.max(space.indentLeftOdd, space.indentLeftEven);
    return result + Sum(space.left, indentLeft, ...space.column, space.right);
}

export default GetChildrenWidth;