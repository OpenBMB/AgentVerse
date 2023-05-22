import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject.js';
import PreLayoutChild from './utils/PreLayoutChild.js';
import LayoutChild from './utils/LayoutChild.js';

const ALIGN_CENTER = Phaser.Display.Align.CENTER;

var LayoutBackgrounds = function () {
    if (this.backgroundChildren === undefined) {
        return;
    }
    var backgrounds = this.backgroundChildren;

    var startX = this.left,
        startY = this.top;
    var parentWidth = this.width,
        parentHeight = this.height;
    var child, childConfig, padding,
        x, y, width, height;
    for (var i = 0, cnt = backgrounds.length; i < cnt; i++) {
        child = backgrounds[i];
        childConfig = child.rexSizer;
        if (childConfig.hidden) {
            continue;
        }

        padding = childConfig.padding;

        PreLayoutChild.call(this, child);

        x = startX + padding.left;
        y = startY + padding.top;
        width = parentWidth - padding.left - padding.right;
        height = parentHeight - padding.top - padding.bottom;

        ResizeGameObject(child, width, height);

        LayoutChild.call(this, child, x, y, width, height, ALIGN_CENTER);
    }
}

export default LayoutBackgrounds;