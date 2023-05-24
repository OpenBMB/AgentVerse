import { GetDisplayWidth } from '../../size/GetDisplaySize.js';

var SetLeft = function (gameObject, value) {
    var width = GetDisplayWidth(gameObject);
    gameObject.x = value + (width * gameObject.originX);
    return gameObject;
};

export default SetLeft;
