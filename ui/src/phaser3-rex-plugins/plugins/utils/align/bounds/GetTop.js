import { GetDisplayHeight } from '../../size/GetDisplaySize.js';

var GetTop = function (gameObject) {
    var height = GetDisplayHeight(gameObject);
    return gameObject.y - (height * gameObject.originY);
};

export default GetTop;
