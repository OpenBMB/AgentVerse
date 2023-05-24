import GetRight from '../../bounds/GetRight.js';
import GetTop from '../../bounds/GetTop.js';
import SetRight from '../../bounds/SetRight.js';
import SetTop from '../../bounds/SetTop.js';

var TopRight = function (gameObject, alignIn, offsetX, offsetY) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetRight(gameObject, GetRight(alignIn) + offsetX);
    SetTop(gameObject, GetTop(alignIn) - offsetY);

    return gameObject;
};

export default TopRight;
