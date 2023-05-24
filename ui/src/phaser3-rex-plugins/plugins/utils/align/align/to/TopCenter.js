import GetCenterX from '../../bounds/GetCenterX.js';
import GetTop from '../../bounds/GetTop.js';
import SetBottom from '../../bounds/SetBottom.js';
import SetCenterX from '../../bounds/SetCenterX.js';

var TopCenter = function (gameObject, alignTo, offsetX, offsetY) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetCenterX(gameObject, GetCenterX(alignTo) + offsetX);
    SetBottom(gameObject, GetTop(alignTo) - offsetY);

    return gameObject;
};

export default TopCenter;
