import { GetDisplayHeight } from '../../size/GetDisplaySize.js';

var SetTop = function (gameObject, value) {
    var height = GetDisplayHeight(gameObject);
    gameObject.y = value + (height * gameObject.originY);
    return gameObject;
};

export default SetTop;
