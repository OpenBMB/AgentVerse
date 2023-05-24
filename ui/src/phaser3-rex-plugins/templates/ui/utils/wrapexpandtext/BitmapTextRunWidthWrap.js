var BitmapTextRunWidthWrap = function (textObject) {
    var RunWidthWrap = function (width) {
        textObject.setMaxWidth(width);

        textObject.minHeight = textObject.height;
        return textObject;
    }
    return RunWidthWrap;
}

export default BitmapTextRunWidthWrap;