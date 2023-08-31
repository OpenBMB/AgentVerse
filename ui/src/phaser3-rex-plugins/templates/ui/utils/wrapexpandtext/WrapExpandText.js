import DynamicTextKlass from '../../dynamictext/DynamicText.js';
import IsBitmapTextGameObject from '../../../../plugins/utils/bitmaptext/IsBitmapTextGameObject.js';
import TextRunWidthWrap from './TextRunWidthWrap.js';
import DynamicTextRunWidthWrap from './DynamicTextRunWidthWrap.js';
import BitmapTextRunWidthWrap from './BitmapTextRunWidthWrap.js';


var IsDynamicTextGameObject = function (gameObject) {
    return (gameObject instanceof DynamicTextKlass);
}

var WrapExpandText = function (textObject, minWidth) {
    if (minWidth === undefined) {
        minWidth = 0;
    }

    textObject._minWidth = minWidth;

    textObject.runWidthWrap =
        IsDynamicTextGameObject(textObject) ? DynamicTextRunWidthWrap(textObject) :
            IsBitmapTextGameObject(textObject) ? BitmapTextRunWidthWrap(textObject) :
                TextRunWidthWrap(textObject);

    return textObject;
}

export default WrapExpandText;