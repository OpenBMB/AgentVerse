import GetBottom from '../../bounds/GetBottom.js';
import GetLeft from '../../bounds/GetLeft.js';
import SetBottom from '../../bounds/SetBottom.js';
import SetLeft from '../../bounds/SetLeft.js';

var BottomLeft = function (gameObject, alignIn, offsetX, offsetY) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetLeft(gameObject, GetLeft(alignIn) - offsetX);
    SetBottom(gameObject, GetBottom(alignIn) + offsetY);

    return gameObject;
};

export default BottomLeft;
