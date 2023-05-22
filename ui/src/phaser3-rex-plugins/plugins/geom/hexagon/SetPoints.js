import InitPoints from '../utils/InitPoints.js';
import DegToRad from '../../utils/math/DegToRad.js';

var SetPoints = function (x, y, size, type, points) {
    if (points === undefined) {
        points = InitPoints(6);
    }

    if (size === undefined) {} else if (typeof (size) === 'number') {
        var angleOffset = (type === 0) ? 0 : -30;
        var angleDeg, angleRad;
        for (var i = 0; i < 6; i++) {
            angleDeg = (60 * i) + angleOffset;
            angleRad = DegToRad(angleDeg);
            points[i].x = x + size * Math.cos(angleRad);
            points[i].y = y + size * Math.sin(angleRad);
        }
    } else {
        var config = size;
        var w = config.width;
        var h = config.height;
        var halfW = w / 2;
        var quarterW = w / 4;
        var halfH = h / 2;
        var quarterH = h / 4;
        if (type === 0) {
            points[0].x = x + halfW;
            points[0].y = y;

            points[1].x = x + quarterW;
            points[1].y = y + halfH;

            points[2].x = x - quarterW;
            points[2].y = y + halfH;

            points[3].x = x - halfW;
            points[3].y = y;

            points[4].x = x - quarterW;
            points[4].y = y - halfH;

            points[5].x = x + quarterW;
            points[5].y = y - halfH;
        } else {
            points[0].x = x + halfW;
            points[0].y = y - quarterH;

            points[1].x = x + halfW;
            points[1].y = y + quarterH;

            points[2].x = x;
            points[2].y = y + halfH;

            points[3].x = x - halfW;
            points[3].y = y + quarterH;

            points[4].x = x - halfW;
            points[4].y = y - quarterH;

            points[5].x = x;
            points[5].y = y - halfH;
        }
    }
    return points;
}

export default SetPoints;