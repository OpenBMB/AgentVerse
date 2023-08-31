import PreLayoutChild from '../basesizer/utils/PreLayoutChild.js';
import LayoutChild from '../basesizer/utils/LayoutChild.js';
import { GetDisplayWidth, GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';


var LayoutChildren = function () {
    var innerLineWidth = this.innerWidth;
    var justifyPercentage = this.justifyPercentage;
    var itemSpace = this.space.item,
        lineSpace = this.space.line,
        indentLeftOdd = this.space.indentLeftOdd,
        indentLeftEven = this.space.indentLeftEven,
        indentTopOdd = this.space.indentTopOdd,
        indentTopEven = this.space.indentTopEven;

    var child, childConfig, padding, justifySpace = 0, indentLeft, indentTop;
    var startX = this.innerLeft,
        startY = this.innerTop;
    var x, y, width, height; // Align zone
    var lines = this.widthWrapResult.lines;
    var line, lineChlidren, remainderLineWidth;

    var itemX,
        itemY = startY;
    for (var i = 0, icnt = lines.length; i < icnt; i++) {
        // Layout this line
        line = lines[i];
        lineChlidren = line.children;
        if (this.rtl) {
            lineChlidren.reverse();
        }

        indentLeft = (i % 2) ? indentLeftEven : indentLeftOdd;
        itemX = startX + indentLeft;

        remainderLineWidth = (innerLineWidth - line.width);
        switch (this.align) {
            case 0: // left
                break;
            case 1: // right
                itemX += remainderLineWidth;
                break;
            case 2: // center
                itemX += remainderLineWidth / 2;
                break;
            case 3: // justify-left
                justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, justifyPercentage, lineChlidren.length);
                break;
            case 4: // justify-right
                justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, justifyPercentage, lineChlidren.length);
                if (justifySpace === 0) {
                    // Align right
                    itemX += remainderLineWidth;
                }
                break;
            case 5: // justify-center
                justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, justifyPercentage, lineChlidren.length);
                if (justifySpace === 0) {
                    // Align center
                    itemX += remainderLineWidth / 2;
                }
                break;
        }

        var isFirstChild = true;
        for (var j = 0, jcnt = lineChlidren.length; j < jcnt; j++) {
            child = lineChlidren[j];
            if (child.rexSizer.hidden) {
                continue;
            }

            childConfig = child.rexSizer;
            padding = childConfig.padding;

            PreLayoutChild.call(this, child);

            x = (itemX + padding.left);

            if (isFirstChild) {
                isFirstChild = false;
            } else {
                x += itemSpace;
            }

            indentTop = (j % 2) ? indentTopEven : indentTopOdd;
            y = (itemY + indentTop + padding.top);
            width = GetDisplayWidth(child);
            height = GetDisplayHeight(child);
            itemX = x + width + padding.right + justifySpace;

            LayoutChild.call(this, child, x, y, width, height, childConfig.align);
        }

        itemY += line.height + lineSpace;
    }
}

var GetJustifySpace = function (total, remainder, justifyPercentage, childCount) {
    return ((remainder / total) <= justifyPercentage) ? (remainder / (childCount - 1)) : 0;
}

export default LayoutChildren;