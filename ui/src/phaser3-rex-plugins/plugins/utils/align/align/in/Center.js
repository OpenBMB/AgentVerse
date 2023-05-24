import CenterOn from '../../bounds/CenterOn.js';
import GetCenterX from '../../bounds/GetCenterX.js';
import GetCenterY from '../../bounds/GetCenterY.js';

var Center = function (gameObject, alignIn, offsetX, offsetY) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    CenterOn(gameObject, GetCenterX(alignIn) + offsetX, GetCenterY(alignIn) + offsetY);

    return gameObject;
};

export default Center;
