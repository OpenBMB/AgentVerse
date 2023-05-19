var LocalXYToModelMatrixXY = function (localX, localY, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = GlobMatrixXY;
    }

    out.x = (localX - (this._pixelWidth / 2)) / this._pixelsPerUnit;
    out.y = ((this._pixelHeight / 2) - localY) / this._pixelsPerUnit;

    return out;
}

var GlobMatrixXY = {};

export default LocalXYToModelMatrixXY;