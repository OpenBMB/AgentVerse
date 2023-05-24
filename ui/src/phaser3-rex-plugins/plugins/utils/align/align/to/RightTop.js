import GetRight from '../../bounds/GetRight.js';
import GetTop from '../../bounds/GetTop.js';
import SetLeft from '../../bounds/SetLeft.js';
import SetTop from '../../bounds/SetTop.js';

var RightTop = function (gameObject, alignTo, offsetX, offsetY) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetLeft(gameObject, GetRight(alignTo) + offsetX);
    SetTop(gameObject, GetTop(alignTo) - offsetY);

    return gameObject;
};

export default RightTop;
