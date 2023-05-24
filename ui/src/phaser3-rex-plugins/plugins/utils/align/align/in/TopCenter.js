import GetCenterX from '../../bounds/GetCenterX.js';
import GetTop from '../../bounds/GetTop.js';
import SetCenterX from '../../bounds/SetCenterX.js';
import SetTop from '../../bounds/SetTop.js';

var TopCenter = function (gameObject, alignIn, offsetX, offsetY) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetCenterX(gameObject, GetCenterX(alignIn) + offsetX);
    SetTop(gameObject, GetTop(alignIn) - offsetY);

    return gameObject;
};

export default TopCenter;
