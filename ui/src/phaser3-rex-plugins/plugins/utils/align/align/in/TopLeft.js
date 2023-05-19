import GetLeft from '../../bounds/GetLeft.js';
import GetTop from '../../bounds/GetTop.js';
import SetLeft from '../../bounds/SetLeft.js';
import SetTop from '../../bounds/SetTop.js';

var TopLeft = function (gameObject, alignIn, offsetX, offsetY) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetLeft(gameObject, GetLeft(alignIn) - offsetX);
    SetTop(gameObject, GetTop(alignIn) - offsetY);

    return gameObject;
};

export default TopLeft;
