import IsPointInBounds from '../../../plugins/utils/bounds/IsPointInBounds.js';

var ContainsPoint = function (gameObject, x, y, preTest, postTest) {
    return IsPointInBounds(
        gameObject,
        x, y,
        GetPreTestCallback(preTest),
        GetPostTestCallback(postTest)
    );
}

var IsNotHiddenSizer = function (gameObject) {
    var isHiddenSizer = gameObject.rexSizer && gameObject.rexSizer.hidden;
    return !isHiddenSizer;
}

var GetPreTestCallback = function (preTest) {
    if (!preTest) {
        return IsNotHiddenSizer;
    }

    return function (gameObject, x, y) {
        if (!IsNotHiddenSizer(gameObject)) {
            return false;
        }
        preTest(gameObject, x, y);
        return true;
    }
}

var GetPostTestCallback = function (postTest) {
    return postTest;
}

export default ContainsPoint;