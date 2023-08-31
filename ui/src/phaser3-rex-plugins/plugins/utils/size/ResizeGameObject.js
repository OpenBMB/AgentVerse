var ResizeGameObject = function (gameObject, newWidth, newHeight) {
    if (!gameObject || ((newWidth === undefined) && (newHeight === undefined))) {
        return;
    }
    if (gameObject.resize || gameObject.setSize) { // Has `resize`, or `setSize` method
        if (newWidth === undefined) {
            newWidth = gameObject.width;
        }
        if (newHeight === undefined) {
            newHeight = gameObject.height;
        }

        if (gameObject.resize) {
            gameObject.resize(newWidth, newHeight);
        } else {
            gameObject.setSize(newWidth, newHeight);
        }
    } else { // Set display width/height
        if (newWidth !== undefined) {
            gameObject.displayWidth = newWidth;
        }
        if (newHeight !== undefined) {
            gameObject.displayHeight = newHeight;
        }
    }
}

export default ResizeGameObject;