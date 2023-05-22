var VPXYToXY = function (vpx, vpy, vpxOffset, vpyOffset, viewport, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = GlobXY;
    }

    if (typeof (vpxOffset) !== 'number') {
        vpxOffset = 0;
        vpyOffset = 0;
    }

    out.x = viewport.x + (viewport.width * vpx) + vpxOffset;
    out.y = viewport.y + (viewport.height * vpy) + vpyOffset;
    return out;
}

var GlobXY = {};

export default VPXYToXY;