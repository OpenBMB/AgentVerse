var CopyState = function (gamObject, out) {
    if (out === undefined) {
        out = {}
    } else if (out === true) {
        out = GlobState;
    }

    out.x = gamObject.x;
    out.y = gamObject.y;
    out.scaleX = gamObject.scaleX;
    out.scaleY = gamObject.scaleY;
    out.width = gamObject.width;
    out.height = gamObject.height;
    out.displayWidth = gamObject.displayWidth;
    out.displayHeight = gamObject.displayHeight;

    return out;
}

var GlobState = {};

export default CopyState;