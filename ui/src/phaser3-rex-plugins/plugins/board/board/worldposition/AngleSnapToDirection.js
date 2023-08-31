import RadToDeg from '../../../utils/math/RadToDeg.js';
import ShortestBetween from '../../../utils/math/angle/ShortestBetween.js';

var AngleSnapToDirection = function (tileXY, angle) {
    angle = RadToDeg(angle); // -180~180
    var directions = this.grid.allDirections;
    var neighborAngle, deltaAngle;
    var minDeltaAngle = Infinity,
        direction = undefined;
    for (var i = 0, cnt = directions.length; i < cnt; i++) {
        neighborAngle = RadToDeg(this.angleToward(tileXY, directions[i])); // -PI~PI -> -180~180
        deltaAngle = Math.abs(ShortestBetween(angle, neighborAngle));
        if (deltaAngle < minDeltaAngle) {
            minDeltaAngle = deltaAngle;
            direction = i;
        }
    }

    return direction;
};

export default AngleSnapToDirection;