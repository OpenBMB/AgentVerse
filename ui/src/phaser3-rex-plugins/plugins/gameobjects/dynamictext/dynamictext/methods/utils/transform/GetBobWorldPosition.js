import BobPositionToWorldPosition from './BobPositionToWorldPosition.js';

var GetBobWorldPosition = function (dynamicText, bob, offsetX, offsetY, out) {
    if (typeof (offsetX) !== 'number') {
        out = offsetX;
        offsetX = 0;
        offsetY = 0;
    }
    var bobX = bob.drawCenterX + offsetX;
    var bobY = bob.drawCenterY + offsetY;
    return BobPositionToWorldPosition(dynamicText, bob, bobX, bobY, out);
}

export default GetBobWorldPosition;