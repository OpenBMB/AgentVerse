import { GetDisplayHeight } from '../../size/GetDisplaySize.js';

var GetBottom = function (gameObject) {
    var height = GetDisplayHeight(gameObject);
    return (gameObject.y + height) - (height * gameObject.originY);
};

export default GetBottom;
