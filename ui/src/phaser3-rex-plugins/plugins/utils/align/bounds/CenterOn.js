import SetCenterX from './SetCenterX.js';
import SetCenterY from './SetCenterY.js';

var CenterOn = function (gameObject, x, y) {
    SetCenterX(gameObject, x);
    return SetCenterY(gameObject, y);
};

export default CenterOn;
