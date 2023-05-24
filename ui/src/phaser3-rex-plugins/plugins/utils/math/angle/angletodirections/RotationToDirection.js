import AngleToDirection from './AngleToDirections.js';
import RadToDeg from '../../RadToDeg.js';

var RotationToDirection = function (rotation, dirMode, out) {
    return AngleToDirection(RadToDeg(rotation), dirMode, out);
}
export default RotationToDirection;