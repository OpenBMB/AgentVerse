import { GetDisplayWidth } from '../../size/GetDisplaySize.js';

var GetRight = function (gameObject) {
    var width = GetDisplayWidth(gameObject);
    return (gameObject.x + width) - (width * gameObject.originX);
};

export default GetRight;
