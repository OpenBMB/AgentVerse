import { GetDisplayWidth } from '../../size/GetDisplaySize.js';

var SetRight = function (gameObject, value) {
    var width = GetDisplayWidth(gameObject);
    gameObject.x = (value - width) + (width * gameObject.originX);

    return gameObject;
};

export default SetRight;
