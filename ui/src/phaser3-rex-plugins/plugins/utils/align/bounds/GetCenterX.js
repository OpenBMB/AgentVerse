import { GetDisplayWidth } from '../../size/GetDisplaySize.js';

var GetCenterX = function (gameObject) {
    var width = GetDisplayWidth(gameObject);
    return gameObject.x - (width * gameObject.originX) + (width * 0.5);
};

export default GetCenterX;
