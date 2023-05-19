import GetBottom from '../../bounds/GetBottom.js';
import GetLeft from '../../bounds/GetLeft.js';
import SetBottom from '../../bounds/SetBottom.js';
import SetRight from '../../bounds/SetRight.js';

var LeftBottom = function (gameObject, alignTo, offsetX, offsetY) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetRight(gameObject, GetLeft(alignTo) - offsetX);
    SetBottom(gameObject, GetBottom(alignTo) + offsetY);

    return gameObject;
};

export default LeftBottom;
