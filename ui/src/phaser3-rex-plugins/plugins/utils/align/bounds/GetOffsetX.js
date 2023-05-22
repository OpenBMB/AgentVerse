import { GetDisplayWidth } from '../../size/GetDisplaySize.js';

var GetOffsetX = function (gameObject) {
    var width = GetDisplayWidth(gameObject);
    return width * gameObject.originX;
};

export default GetOffsetX;
