import { GetDisplayHeight } from '../../size/GetDisplaySize.js';

var SetCenterY = function (gameObject, y) {
    var height = GetDisplayHeight(gameObject);
    var offsetY = height * gameObject.originY;
    gameObject.y = (y + offsetY) - (height * 0.5);

    return gameObject;
};

export default SetCenterY;
