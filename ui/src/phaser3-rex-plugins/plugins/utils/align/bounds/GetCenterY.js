import { GetDisplayHeight } from '../../size/GetDisplaySize.js';

var GetCenterY = function (gameObject) {
    var height = GetDisplayHeight(gameObject);
    return gameObject.y - (height * gameObject.originY) + (height * 0.5);
};

export default GetCenterY;
