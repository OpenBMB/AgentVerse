import GetCenterY from '../../bounds/GetCenterY.js';
import GetRight from '../../bounds/GetRight.js';
import SetCenterY from '../../bounds/SetCenterY.js';
import SetLeft from '../../bounds/SetLeft.js';

var RightCenter = function (gameObject, alignTo, offsetX, offsetY) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetLeft(gameObject, GetRight(alignTo) + offsetX);
    SetCenterY(gameObject, GetCenterY(alignTo) + offsetY);

    return gameObject;
};

export default RightCenter;
