import SetFontSizeToFitWidth from '../../../../plugins/utils/text/setfontsizetofitwidth/SetFontSizeToFitWidth.js';

var FontSizeExpandText = function (textObject, minWidth) {
    if (minWidth === undefined) {
        minWidth = 0;
    }

    textObject._minWidth = minWidth;

    textObject.runWidthWrap = function (width, maxHeight) {
        SetFontSizeToFitWidth(textObject, width, maxHeight);
        return textObject;
    }
    textObject.resize = function (width, height) {
        if ((textObject.width === width) && (textObject.height === height)) {
            return textObject;
        }

        // Font size is set under runWidthWrap/SetFontSizeToFitWidth
        textObject.setFixedSize(width, height);
        return textObject;
    }

    return textObject;
}

export default FontSizeExpandText;