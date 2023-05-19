import GlobZone from './GlobZone.js';
import QuickSet from '../align/align/in/QuickSet.js';

var AlignIn = function (child, x, y, width, height, align) {
    GlobZone.setPosition(x, y).setSize(width, height);
    QuickSet(child, GlobZone, align);
}

export default AlignIn;