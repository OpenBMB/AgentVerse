import GetThumbAlignPoint from './GetThumbAlignPoint.js';

const AlignRight = Phaser.Display.Align.RIGHT_CENTER;
const AlignBottom = Phaser.Display.Align.BOTTOM_CENTER;

var GetEndoint = function (out) {
    if (out === undefined) {
        out = tmpPoint;
    }
    if (this.childrenMap.thumb) {
        var align = (this.orientation === 0) ? AlignRight : AlignBottom;
        GetThumbAlignPoint.call(this, align, out);
    } else {
        if (this.orientation === 0) {
            out.x = this.innerRight - 1; // Add 1 pixel margin
            out.y = this.centerY;
        } else {
            out.x = this.centerX;
            out.y = this.innerBottom - 1; // Add 1 pixel margin
        }
    }
    return out;
}

var tmpPoint = {};

export default GetEndoint;