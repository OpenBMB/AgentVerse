import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject.js';
import AlignIn from '../../../plugins/utils/align/align/in/QuickSet.js';
import { GetDisplayWidth, GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';

const AlignLeft = Phaser.Display.Align.LEFT_CENTER;
const AlignTop = Phaser.Display.Align.TOP_CENTER;
const AlignRight = Phaser.Display.Align.RIGHT_CENTER;
const AlignBottom = Phaser.Display.Align.BOTTOM_CENTER;

var UpdateIndicator = function (t) {
    var indicator = this.childrenMap.indicator;
    if (indicator === undefined) {
        return this;
    }

    if (t === undefined) {
        t = this.value;
    }

    var reverseAxis = this.reverseAxis;
    var newWidth, newHeight;
    var thumb = this.childrenMap.thumb;
    if (thumb) {
        if (this.orientation === 0) { // x, extend width
            var thumbWidth = GetDisplayWidth(thumb);

            if (!reverseAxis) {
                var thumbLeft = thumb.x - (thumbWidth * thumb.originX);
                var thumbRight = thumbLeft + thumbWidth;
                newWidth = thumbRight - this.left;
            } else {
                var thumbLeft = thumb.x - (thumbWidth * thumb.originX);
                newWidth = this.right - thumbLeft;
            }
        } else { // y, extend height
            var thumbHeight = GetDisplayHeight(thumb);

            if (!reverseAxis) {
                var thumbTop = thumb.y - (thumbHeight * thumb.originY);
                var thumbBottom = thumbTop + thumbHeight;
                newHeight = thumbBottom - this.top;
            } else {
                var thumbTop = thumb.y - (thumbHeight * thumb.originY);
                newHeight = this.bottom - thumbTop;
            }
        }
    } else {
        if (this.orientation === 0) { // x, extend width
            newWidth = this.width * t;
        } else { // y, extend eight
            newHeight = this.height * t;
        }
    }
    ResizeGameObject(indicator, newWidth, newHeight);

    var align;
    if (!reverseAxis) {
        align = (this.orientation === 0) ? AlignLeft : AlignTop;
    } else {
        align = (this.orientation === 0) ? AlignRight : AlignBottom;
    }
    AlignIn(indicator, this, align);

    this.resetChildPositionState(indicator);
}

export default UpdateIndicator;