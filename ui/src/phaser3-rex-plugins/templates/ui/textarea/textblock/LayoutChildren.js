import ResizeText from './ResizeText.js';
import ResetTextObjectPosition from './ResetTextObjectPosition.js';
import AlignIn from '../../../../plugins/utils/actions/AlignIn.js';

var LayoutChildren = function () {
    var child, childConfig, padding;
    var startX = this.left,
        startY = this.top;
    var x, y, width, height; // Align zone

    // LayoutChildren text child
    // Skip invisible child
    child = this.textObject;
    if (!child.rexSizer.hidden) {
        childConfig = child.rexSizer;
        padding = childConfig.padding;
        x = (startX + padding.left);
        y = (startY + padding.top);
        width = this.width - padding.left - padding.right;
        height = this.height - padding.top - padding.bottom;
        ResizeText.call(this, child, width, height);

        AlignIn(child, x, y, width, height, childConfig.align);

        childConfig.preOffsetY = 0; // Clear preOffsetY
        ResetTextObjectPosition.call(this);

        if (this.textMask) {
            this.textMask.setPosition().resize();
            this.resetChildPositionState(this.textMask);
        }

    }
}

export default LayoutChildren;