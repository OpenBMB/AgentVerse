import GetChildrenAlign from '../GetChildrenAlign.js';
import OffsetChildren from '../OffsetChildren.js';

var AlignLines = function (result, width, height) {
    var hAlign = result.hAlign,
        vAlign = result.vAlign;

    var offsetX, offsetY;

    var linesHeight = result.linesHeight;
    switch (vAlign) {
        case 1: // center
        case 'center':
            offsetY = (height - linesHeight) / 2;
            break;

        case 2: // bottom
        case 'bottom':
            offsetY = height - linesHeight;
            break;

        default:
            offsetY = 0;
            break;
    }

    var lines = result.lines;
    for (var li = 0, lcnt = lines.length; li < lcnt; li++) {
        var line = lines[li];
        var lineWidth = line.width,
            children = line.children;

        var lineHAlign = GetChildrenAlign(children);
        if (lineHAlign === undefined) {
            lineHAlign = hAlign;
        }

        switch (lineHAlign) {
            case 1:  // center
            case 'center':
                offsetX = (width - lineWidth) / 2
                break;

            case 2:  // right
            case 'right':
                offsetX = width - lineWidth;
                break;

            default:
                offsetX = 0;
                break;
        }

        OffsetChildren(children, offsetX, offsetY);

    }

}

export default AlignLines;