import BobPositionToCanvasPosition from './BobPositionToCanvasPosition.js';
import GameObjectLocalXYToWorldXY from '../../../../../../utils/position/GameObjectLocalXYToWorldXY.js';

var BobPositionToWorldPosition = function (dynamicText, bob, bobX, bobY, out) {
    var localXY = BobPositionToCanvasPosition(bob, bobX, bobY, true);
    var worldXY = GameObjectLocalXYToWorldXY(dynamicText, localXY.x, localXY.y, out);
    return worldXY;
}

export default BobPositionToWorldPosition;