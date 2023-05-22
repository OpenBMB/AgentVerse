import GetCenterY from '../../bounds/GetCenterY.js';
import GetRight from '../../bounds/GetRight.js';
import SetCenterY from '../../bounds/SetCenterY.js';
import SetRight from '../../bounds/SetRight.js';

var RightCenter = function (gameObject, alignIn, offsetX, offsetY) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetRight(gameObject, GetRight(alignIn) + offsetX);
    SetCenterY(gameObject, GetCenterY(alignIn) + offsetY);

    return gameObject;
};

export default RightCenter;
