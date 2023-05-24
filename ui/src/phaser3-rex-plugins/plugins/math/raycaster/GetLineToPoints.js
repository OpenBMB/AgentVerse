const GetLineToLine = Phaser.Geom.Intersects.GetLineToLine;
const PointToLine = Phaser.Geom.Intersects.PointToLine

var GetLineToPoints = function (line, points, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globResult;
    }
    /* 
    out: {
        x,y,      // intersection point
        d,        // intersection distance
        segIndex  // intersection segment
    }
    */

    var closestIntersect = false;

    startPoint.setTo(line.x1, line.y1);
    out.d = Infinity;
    tempIntersect.set();

    var prev = points[0];

    for (var i = 1; i < points.length; i++) {
        var current = points[i];

        segment.setTo(prev.x, prev.y, current.x, current.y);
        prev = current;

        // Ignore case: start point of line is at segment
        if (PointToLine(startPoint, segment)) {
            continue;
        }

        if (GetLineToLine(line, segment, false, tempIntersect)) {
            if (tempIntersect.z < out.d) {
                out.x = tempIntersect.x;
                out.y = tempIntersect.y;
                out.d = tempIntersect.z;
                out.segIndex = i - 1;

                closestIntersect = true;
            }
        }
    }

    return (closestIntersect) ? out : null;
};

var globResult = {};
var startPoint = new Phaser.Geom.Point();
var segment = new Phaser.Geom.Line();
var tempIntersect = new Phaser.Math.Vector3();

export default GetLineToPoints;