import AreTileXYEqual from './AreTileXYEqual.js';

var IsTileXYInArray = function (tile, arr) {
    for (var i = 0, cnt = arr.length; i < cnt; i++) {
        if (AreTileXYEqual(tile, arr[i])) {
            return true;
        }
    }
    return false;
}

export default IsTileXYInArray;