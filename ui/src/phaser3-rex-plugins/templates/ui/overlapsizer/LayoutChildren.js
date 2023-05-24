import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject.js';
import PreLayoutChild from '../basesizer/utils/PreLayoutChild.js';
import LayoutChild from '../basesizer/utils/LayoutChild.js';
import CheckSize from '../basesizer/utils/CheckSize.js';

var LayoutChildren = function () {
    var child, childConfig, padding;
    var startX = this.innerLeft,
        startY = this.innerTop;
    var innerWidth = this.innerWidth,
        innerHeight = this.innerHeight;
    var x, y, width, height; // Align zone
    var childWidth, childHeight;
    // Layout current page
    var children = this.sizerChildren;
    for (var key in children) {
        child = children[key];
        if (child.rexSizer.hidden) {
            continue;
        }

        childConfig = child.rexSizer;
        padding = childConfig.padding;

        PreLayoutChild.call(this, child);

        // Set size
        if (child.isRexSizer) {
            child.runLayout(
                this,
                this.getExpandedChildWidth(child),
                this.getExpandedChildHeight(child)
            );
            CheckSize(child, this);
        } else {
            childWidth = undefined;
            childHeight = undefined;
            if (childConfig.expandWidth) { // Expand width
                childWidth = innerWidth - padding.left - padding.right;
            }
            if (childConfig.expandHeight) { // Expand height
                childHeight = innerHeight - padding.top - padding.bottom;
            }
            ResizeGameObject(child, childWidth, childHeight);
        }

        // Set position
        x = (startX + padding.left);
        width = innerWidth - padding.left - padding.right;
        y = (startY + padding.top);
        height = innerHeight - padding.top - padding.bottom;

        LayoutChild.call(this,
            child, x, y, width, height, childConfig.align,
            childConfig.alignOffsetX, childConfig.alignOffsetY
        );
    }
}

export default LayoutChildren;