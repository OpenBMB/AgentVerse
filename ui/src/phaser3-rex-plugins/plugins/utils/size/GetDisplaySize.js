var GetDisplayWidth = function (gameObject) {
    if (gameObject.displayWidth !== undefined) {
        return gameObject.displayWidth;
    } else {
        return gameObject.width;
    }
}

var GetDisplayHeight = function (gameObject) {
    if (gameObject.displayHeight !== undefined) {
        return gameObject.displayHeight;
    } else {
        return gameObject.height;
    }
}

export {
    GetDisplayWidth,
    GetDisplayHeight
}