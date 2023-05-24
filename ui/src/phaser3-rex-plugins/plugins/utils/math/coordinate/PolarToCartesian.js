var PolarToCartesian = function (ox, oy, rotation, radius, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globOut;
    }

    out.x = (radius * Math.cos(rotation)) + ox;
    out.y = (radius * Math.sin(rotation)) + oy;

    return out;
}

var globOut = {};

export default PolarToCartesian;