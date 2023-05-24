import GetBottom from '../../bounds/GetBottom.js';
import GetCenterX from '../../bounds/GetCenterX.js';
import SetBottom from '../../bounds/SetBottom.js';
import SetCenterX from '../../bounds/SetCenterX.js';

var BottomCenter = function (gameObject, alignIn, offsetX, offsetY) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetCenterX(gameObject, GetCenterX(alignIn) + offsetX);
    SetBottom(gameObject, GetBottom(alignIn) + offsetY);

    return gameObject;
};

export default BottomCenter;
