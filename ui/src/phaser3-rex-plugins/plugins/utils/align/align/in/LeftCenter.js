import GetCenterY from '../../bounds/GetCenterY.js';
import GetLeft from '../../bounds/GetLeft.js';
import SetCenterY from '../../bounds/SetCenterY.js';
import SetLeft from '../../bounds/SetLeft.js';

var LeftCenter = function (gameObject, alignIn, offsetX, offsetY) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetLeft(gameObject, GetLeft(alignIn) - offsetX);
    SetCenterY(gameObject, GetCenterY(alignIn) + offsetY);

    return gameObject;
};

export default LeftCenter;
