import BobPositionToCanvasPosition from './BobPositionToCanvasPosition.js';

var GetBobCenterPosition = function (bob, offsetX, offsetY, out) {
    if (typeof (offsetX) !== 'number') {
        out = offsetX;
        offsetX = 0;
        offsetY = 0;
    }
    var bobX = bob.drawCenterX + offsetX;
    var bobY = bob.drawCenterY + offsetY;
    return BobPositionToCanvasPosition(bob, bobX, bobY, out);
}

export default GetBobCenterPosition;