import { GetDisplayWidth } from '../../size/GetDisplaySize.js';

var SetCenterX = function (gameObject, x) {
    var width = GetDisplayWidth(gameObject);
    var offsetX = width * gameObject.originX;
    gameObject.x = (x + offsetX) - (width * 0.5);

    return gameObject;
};

export default SetCenterX;
