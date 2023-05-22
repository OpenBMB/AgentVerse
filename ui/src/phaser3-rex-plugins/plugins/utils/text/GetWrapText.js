import {
    TextType, TagTextType, BitmapTextType
} from './GetTextObjectType.js';
import GetTextObjectType from './GetTextObjectType.js';

var GetWrapText = function (textObject, text) {
    var textObjectType = GetTextObjectType(textObject);
    switch (textObjectType) {
        case TextType:
            textObject.style.syncFont(textObject.canvas, textObject.context);
            text = textObject.runWordWrap(text);
            break;
        case TagTextType:
            text = textObject.getText(text, undefined, undefined, true);
            break;
        case BitmapTextType:
            text = textObject.setText(text).getTextBounds().wrappedText;
            break;
    }
    return text;
}

export default GetWrapText;