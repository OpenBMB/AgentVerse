import Linear from '../math/Linear.js';
import { GetR, GetG, GetB } from './GetRGB.js';

var MixColor = function (color0, color1, t) {
    var r = Linear(GetR(color0), GetR(color1), t);
    var g = Linear(GetG(color0), GetG(color1), t);
    var b = Linear(GetB(color0), GetB(color1), t);
    return ((r & 0xff) << 16) | ((g & 0xff) << 8) | ((b & 0xff));
}

export default MixColor;