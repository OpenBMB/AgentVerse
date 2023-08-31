import IsTextGameObject from './IsTextGameObject.js';
import IsBitmapTextGameObject from '../bitmaptext/IsBitmapTextGameObject.js';

const TextType = 0;
const TagTextType = 1;
const BitmapTextType = 2;

export {
    TextType, TagTextType, BitmapTextType
}

var GetTextObjectType = function (textObject) {
    var textObjectType;
    if (IsBitmapTextGameObject(textObject)) {
        textObjectType = BitmapTextType;
    } else if (IsTextGameObject(textObject)) {
        textObjectType = TextType;
    } else {
        textObjectType = TagTextType;
    }

    return textObjectType;
}

export default GetTextObjectType;