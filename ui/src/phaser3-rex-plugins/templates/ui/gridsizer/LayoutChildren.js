import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject.js';
import PreLayoutChild from '../basesizer/utils/PreLayoutChild.js';
import LayoutChild from '../basesizer/utils/LayoutChild.js';
import CheckSize from '../basesizer/utils/CheckSize.js';

var LayoutChildren = function () {
    var child, childConfig, padding;
    var startX = this.innerLeft,
        startY = this.innerTop;
    var itemX,
        itemY = startY;
    var x, y, width, height; // Align zone
    var childWidth, childHeight;
    // Layout grid children
    var columnSpace = this.space.column,
        rowSpace = this.space.row,
        indentLeftOdd = this.space.indentLeftOdd,
        indentLeftEven = this.space.indentLeftEven,
        indentTopOdd = this.space.indentTopOdd,
        indentTopEven = this.space.indentTopEven;

    var colWidth, rowHeight;
    var indentLeft, indentTop;
    for (var rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
        rowHeight = this.getRowHeight(rowIndex);

        indentLeft = (rowIndex % 2) ? indentLeftEven : indentLeftOdd;
        itemX = startX + indentLeft;
        for (var columnIndex = 0; columnIndex < this.columnCount; columnIndex++) {
            colWidth = this.getColumnWidth(columnIndex);

            child = this.getChildAt(columnIndex, rowIndex);
            if ((!child) || (child.rexSizer.hidden)) {
                itemX += (colWidth + columnSpace[columnIndex]);
                continue;
            }

            PreLayoutChild.call(this, child);

            childWidth = this.getExpandedChildWidth(child, colWidth);
            childHeight = this.getExpandedChildHeight(child, rowHeight);
            if (child.isRexSizer) {
                child.runLayout(this, childWidth, childHeight);
                CheckSize(child, this);
            } else {
                ResizeGameObject(child, childWidth, childHeight);
            }

            childConfig = child.rexSizer;
            padding = childConfig.padding;

            x = (itemX + padding.left);
            width = colWidth - padding.left - padding.right;

            indentTop = (columnIndex % 2) ? indentTopEven : indentTopOdd;
            y = (itemY + indentTop + padding.top);
            height = rowHeight - padding.top - padding.bottom;

            LayoutChild.call(this, child, x, y, width, height, childConfig.align);

            itemX += (colWidth + columnSpace[columnIndex]);
        }

        itemY += (rowHeight + rowSpace[rowIndex]);
    }
}

export default LayoutChildren;