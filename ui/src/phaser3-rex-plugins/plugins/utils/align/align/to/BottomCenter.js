import GetBottom from '../../bounds/GetBottom.js';
import GetCenterX from '../../bounds/GetCenterX.js';
import SetCenterX from '../../bounds/SetCenterX.js';
import SetTop from '../../bounds/SetTop.js';

var BottomCenter = function (gameObject, alignTo, offsetX, offsetY) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetCenterX(gameObject, GetCenterX(alignTo) + offsetX);
    SetTop(gameObject, GetBottom(alignTo) + offsetY);

    return gameObject;
};

export default BottomCenter;
