const MaskR = (~(0xff << 16) & 0xffffff);
const MaskG = (~(0xff << 8) & 0xffffff);
const MaskB = (~(0xff) & 0xffffff);

var SetR = function (colorInt, r) {
    return ((r & 0xff) << 16) | (colorInt & MaskR);
}

var SetG = function (colorInt, g) {
    return ((g & 0xff) << 8) | (colorInt & MaskG);
}

var SetB = function (colorInt, b) {
    return (b & 0xff) | (colorInt & MaskB);
}

var SetRGB = function (colorInt, r, g, b) {
    return ((r & 0xff) << 16) | ((g & 0xff) << 8) | ((b & 0xff));
}

export {
    SetR, SetG, SetB, SetRGB
}