var ScreenXYToWorldXY = function (screenX, screenY, camera, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globalOut;
    }

    camera.getWorldPoint(screenX, screenY, out);
    return out;
}

var globalOut = {};

export default ScreenXYToWorldXY;