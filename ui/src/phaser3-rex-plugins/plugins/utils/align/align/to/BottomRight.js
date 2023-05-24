import GetBottom from '../../bounds/GetBottom.js';
import GetRight from '../../bounds/GetRight.js';
import SetRight from '../../bounds/SetRight.js';
import SetTop from '../../bounds/SetTop.js';

var BottomRight = function (gameObject, alignTo, offsetX, offsetY) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetRight(gameObject, GetRight(alignTo) + offsetX);
    SetTop(gameObject, GetBottom(alignTo) + offsetY);

    return gameObject;
};

export default BottomRight;
