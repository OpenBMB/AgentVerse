var Mirror = function (src, mode, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globTileXY;
    }

    out.x = (mode & 1) ? -src.x : src.x;
    out.y = (mode & 2) ? -src.y : src.y;
    return out;
}

var globTileXY = {};
export default Mirror;