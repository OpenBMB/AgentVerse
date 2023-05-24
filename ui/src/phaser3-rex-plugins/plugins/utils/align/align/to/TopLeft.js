import GetLeft from '../../bounds/GetLeft.js';
import GetTop from '../../bounds/GetTop.js';
import SetBottom from '../../bounds/SetBottom.js';
import SetLeft from '../../bounds/SetLeft.js';

var TopLeft = function (gameObject, alignTo, offsetX, offsetY) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetLeft(gameObject, GetLeft(alignTo) - offsetX);
    SetBottom(gameObject, GetTop(alignTo) - offsetY);

    return gameObject;
};

export default TopLeft;
