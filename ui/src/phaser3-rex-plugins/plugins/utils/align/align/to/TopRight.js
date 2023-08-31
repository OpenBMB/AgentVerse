import GetRight from '../../bounds/GetRight.js';
import GetTop from '../../bounds/GetTop.js';
import SetBottom from '../../bounds/SetBottom.js';
import SetRight from '../../bounds/SetRight.js';

var TopRight = function (gameObject, alignTo, offsetX, offsetY) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetRight(gameObject, GetRight(alignTo) + offsetX);
    SetBottom(gameObject, GetTop(alignTo) - offsetY);

    return gameObject;
};

export default TopRight;
