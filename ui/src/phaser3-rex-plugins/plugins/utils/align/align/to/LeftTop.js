import GetLeft from '../../bounds/GetLeft.js';
import GetTop from '../../bounds/GetTop.js';
import SetRight from '../../bounds/SetRight.js';
import SetTop from '../../bounds/SetTop.js';

var LeftTop = function (gameObject, alignTo, offsetX, offsetY) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetRight(gameObject, GetLeft(alignTo) - offsetX);
    SetTop(gameObject, GetTop(alignTo) - offsetY);

    return gameObject;
};

export default LeftTop;
