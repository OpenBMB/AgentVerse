import GetBottom from '../../bounds/GetBottom.js';
import GetRight from '../../bounds/GetRight.js';
import SetBottom from '../../bounds/SetBottom.js';
import SetRight from '../../bounds/SetRight.js';

var BottomRight = function (gameObject, alignIn, offsetX, offsetY) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetRight(gameObject, GetRight(alignIn) + offsetX);
    SetBottom(gameObject, GetBottom(alignIn) + offsetY);

    return gameObject;
};

export default BottomRight;
