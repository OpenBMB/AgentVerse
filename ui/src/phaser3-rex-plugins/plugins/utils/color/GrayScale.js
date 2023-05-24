import { GetR, GetG, GetB } from './GetRGB.js';

var GrayScale = function (color) {
    var shade = 0.3 * GetR(color) + 0.59 * GetG(color) + 0.11 * GetB(color);
    return ((shade & 0xff) << 16) | ((shade & 0xff) << 8) | ((shade & 0xff));
}

export default GrayScale;