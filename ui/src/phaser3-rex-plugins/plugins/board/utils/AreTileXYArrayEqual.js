import AreTileXYEqual from './AreTileXYEqual.js';

var AreTileXYArrayEqual = function (tileArrayA, tileArrayB) {
    if (tileArrayA.length !== tileArrayB.length) {
        return false;
    } else {
        for (var i = 0, cnt = tileArrayA.length; i < cnt; i++) {
            if (!AreTileXYEqual(tileArrayA[i], tileArrayB[i])) {
                return false;
            }
        }
        return true;
    }
}
export default AreTileXYArrayEqual;