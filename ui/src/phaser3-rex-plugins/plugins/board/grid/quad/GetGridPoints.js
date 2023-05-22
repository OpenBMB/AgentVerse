import SetPoints from '../../../geom/quad/SetPoints.js';
import InitPoints from '../../../geom/utils/InitPoints.js';

var GetGridPoints = function (tileX, tileY, points) {
    if (points === undefined) {
        points = InitPoints(4);
    } else if (points === true) {
        points = globPoints;
    }

    if (tileX === undefined) {
        globWorldXY.x = 0;
        globWorldXY.y = 0;
    } else {
        this.getWorldXY(tileX, tileY, globWorldXY);
    }
    var quadType = (this.mode === 0) ? 0 : 1;
    SetPoints(globWorldXY.x, globWorldXY.y, this.width, this.height, quadType, points);
    return points;
}

var globWorldXY = {};
var globPoints = InitPoints(4);

export default GetGridPoints;