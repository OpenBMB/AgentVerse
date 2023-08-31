import {
    TextType, TagTextType, BitmapTextType
} from '../../../utils/text/GetTextObjectType.js';

var GetLines = function (startLineIndex, endLineIdx) {
    if (startLineIndex === undefined) {
        startLineIndex = this.startLineIndex;
    }
    if (endLineIdx === undefined) {
        endLineIdx = startLineIndex + this.pageLinesCount;
    }

    var text;
    switch (this.textObjectType) {
        case TextType:
        case BitmapTextType:
            text = this.lines.slice(startLineIndex, endLineIdx).join('\n');
            break;
        case TagTextType:
            var startIdx = this.lines.getLineStartIndex(startLineIndex);
            var endIdx = this.lines.getLineEndIndex(endLineIdx - 1);
            text = this.lines.getSliceTagText(startIdx, endIdx, true);
            break;
    }

    return text;
}

export default GetLines;