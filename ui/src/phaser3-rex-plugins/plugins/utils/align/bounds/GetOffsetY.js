import { GetDisplayHeight } from '../../size/GetDisplaySize.js';

var GetOffsetY = function (gameObject) {
    var height = GetDisplayHeight(gameObject);
    return height * gameObject.originY;
};

export default GetOffsetY;
