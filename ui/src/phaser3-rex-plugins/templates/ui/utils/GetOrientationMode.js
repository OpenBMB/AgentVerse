var OrientationMode = {
    x: 0,
    h: 0,
    horizontal: 0,
    'left-to-right': 0,

    y: 1,
    v: 1,
    vertical: 1,
    'top-to-bottom': 1
};

var GetOrientationMode = function (orientation) {
    if (typeof (orientation) === 'string') {
        orientation = OrientationMode[orientation];
    }
    return orientation;
}

export default GetOrientationMode;