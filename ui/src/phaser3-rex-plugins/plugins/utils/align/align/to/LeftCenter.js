import GetCenterY from '../../bounds/GetCenterY.js';
import GetLeft from '../../bounds/GetLeft.js';
import SetCenterY from '../../bounds/SetCenterY.js';
import SetRight from '../../bounds/SetRight.js';

var LeftCenter = function (gameObject, alignTo, offsetX, offsetY) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetRight(gameObject, GetLeft(alignTo) - offsetX);
    SetCenterY(gameObject, GetCenterY(alignTo) + offsetY);

    return gameObject;
};

export default LeftCenter;
