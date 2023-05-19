import {
    TextType, TagTextType, BitmapTextType
} from './GetTextObjectType.js';
import GetTextObjectType from './GetTextObjectType.js';

var SetNoWrapText = function (textObject, text) {
    var textObjectType = GetTextObjectType(textObject);
    switch (textObjectType) {
        case TextType:
            // Store wrap properties
            var style = textObject.style;
            var wordWrapWidth = style.wordWrapWidth;
            var wordWrapCallback = style.wordWrapCallback;
            // Disable wrap
            style.wordWrapWidth = 0;
            style.wordWrapCallback = undefined;
            // Set text
            textObject.setText(text);
            // Restore wrap
            style.wordWrapWidth = wordWrapWidth;
            style.wordWrapCallback = wordWrapCallback;
            break;

        case TagTextType:
            // Store wrap properties
            var style = textObject.style;
            var wrapMode = style.wrapMode;
            // Disable wrap
            style.wrapMode = 0;
            // Set text
            textObject.setText(text);
            // Restore wrap
            style.wrapMode = wrapMode;
            break;

        case BitmapTextType:
            // Store wrap properties
            var maxWidth = textObject._maxWidth;
            // Disable wrap
            textObject._maxWidth = 0;
            // Set text
            textObject.setText(text);
            // Restore wrap
            textObject._maxWidth = maxWidth;
            break;
    }
}

export default SetNoWrapText;