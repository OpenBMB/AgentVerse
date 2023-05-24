import { GetDisplayHeight } from '../../size/GetDisplaySize.js';

var SetBottom = function (gameObject, value) {
    var height = GetDisplayHeight(gameObject);
    gameObject.y = (value - height) + (height * gameObject.originY);
    return gameObject;
};

export default SetBottom;
