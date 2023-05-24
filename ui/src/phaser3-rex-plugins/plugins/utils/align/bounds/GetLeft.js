import { GetDisplayWidth } from '../../size/GetDisplaySize.js';

var GetLeft = function (gameObject) {
    var width = GetDisplayWidth(gameObject);
    return gameObject.x - (width * gameObject.originX);
};

export default GetLeft;
