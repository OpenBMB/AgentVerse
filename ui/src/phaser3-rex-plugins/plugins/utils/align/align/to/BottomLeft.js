import GetBottom from '../../bounds/GetBottom.js';
import GetLeft from '../../bounds/GetLeft.js';
import SetLeft from '../../bounds/SetLeft.js';
import SetTop from '../../bounds/SetTop.js';

var BottomLeft = function (gameObject, alignTo, offsetX, offsetY) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetLeft(gameObject, GetLeft(alignTo) - offsetX);
    SetTop(gameObject, GetBottom(alignTo) + offsetY);

    return gameObject;
};

export default BottomLeft;
