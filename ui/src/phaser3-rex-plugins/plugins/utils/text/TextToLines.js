import {
    TextType, TagTextType, BitmapTextType
} from './GetTextObjectType.js';
import GetTextObjectType from './GetTextObjectType.js';

var TextToLines = function (textObject, text, lines) {
    var textObjectType = GetTextObjectType(textObject);
    switch (textObjectType) {
        case TextType:
            lines = textObject.getWrappedText(text); // Array of string
            break;
        case TagTextType:
            lines = textObject.getPenManager(text, lines); // Pens-manager
            break;
        case BitmapTextType:
            if (textObject.maxWidth > 0) {
                lines = textObject.setText(text).getTextBounds().wrappedText.split('\n');
            } else {
                lines = text.split('\n');
            }

            break;
    }
    return lines;
}

export default TextToLines;