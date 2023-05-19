var GetR = function (colorInt) {
    return (colorInt >> 16) & 0xff;
}

var GetG = function (colorInt) {
    return (colorInt >> 8) & 0xff;
}

var GetB = function (colorInt) {
    return (colorInt) & 0xff;
}

export {
    GetR, GetG, GetB
}