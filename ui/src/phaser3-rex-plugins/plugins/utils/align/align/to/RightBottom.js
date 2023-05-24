import GetBottom from '../../bounds/GetBottom.js';
import GetRight from '../../bounds/GetRight.js';
import SetBottom from '../../bounds/SetBottom.js';
import SetLeft from '../../bounds/SetLeft.js';

var RightBottom = function (gameObject, alignTo, offsetX, offsetY) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetLeft(gameObject, GetRight(alignTo) + offsetX);
    SetBottom(gameObject, GetBottom(alignTo) + offsetY);

    return gameObject;
};

export default RightBottom;
