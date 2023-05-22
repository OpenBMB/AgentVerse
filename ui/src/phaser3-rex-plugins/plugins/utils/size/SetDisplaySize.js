var SetDisplaySize = function (gameObject, width, height) {
    if (!gameObject) {
        return;
    }

    var unknownWidth = (width == null);
    var unknownHeight = (height == null);

    if (unknownWidth && unknownHeight) {
        return gameObject;
    }

    if (!unknownWidth) {
        gameObject.displayWidth = width;
    }

    if (!unknownHeight) {
        gameObject.displayHeight = height;
    }

    if (unknownWidth) {
        gameObject.scaleX = gameObject.scaleY;
    }

    if (unknownHeight) {
        gameObject.scaleY = gameObject.scaleX;
    }

    return gameObject;
}

export default SetDisplaySize;