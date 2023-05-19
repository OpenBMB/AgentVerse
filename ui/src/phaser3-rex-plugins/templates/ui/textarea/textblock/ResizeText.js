import { TextType, TagTextType, BitmapTextType } from '../../../../plugins/utils/text/GetTextObjectType.js'

var ResizeText = function (textObject, width, height) {
    height += (this.textLineHeight + this.textLineSpacing); // Add 1 line
    if ((this.textObjectWidth === width) && (this._textObjectRealHeight === height)) {
        return;
    }
    this.textObjectWidth = width;
    this._textObjectRealHeight = height;

    switch (this.textObjectType) {
        case TextType:
        case TagTextType:
            textObject.setFixedSize(width, height);

            var style = textObject.style;
            var wrapWidth = Math.max(width, 0);
            if (this.textObjectType === TextType) {  // Built-in text
                style.wordWrapWidth = wrapWidth;
            } else {  // BBCode text, Tag text
                if (style.wrapMode === 0) { // Turn no-wrap to word-wrap
                    style.wrapMode = 1;
                }
                style.wrapWidth = wrapWidth;
            }
            break;
        case BitmapTextType:
            textObject.setMaxWidth(width);
            break;
    }

    // Render content again
    this.setText();
}

export default ResizeText;