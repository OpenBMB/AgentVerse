const DistanceBetween = Phaser.Math.Distance.Between;
const Linear = Phaser.Math.Linear;

var GetPoint = function (t, points, lengths, out) {
    // points: [x0, y0, x1, y1, ....]
    // lengths: [length01, length12, ...]

    if (out === undefined) {
        out = {};
    }

    if (lengths === undefined) {
        lengths = [];
    }

    if (lengths.length === 0) {
        var p0x, p0y, p1x, p1y;
        for (var i = 0, cnt = points.length; i < cnt; i += 2) {
            p1x = points[i];
            p1y = points[i + 1];

            if (i > 0) {
                lengths.push(DistanceBetween(p0x, p0y, p1x, p1y));
            }

            p0x = p1x;
            p0y = p1y;
        }
    }

    var totalLength = lengths.reduce((a, b) => a + b, 0);

    var segmentIndex,
        remainderLength = t * totalLength;
    for (var i = 0, cnt = lengths.length; i < cnt; i++) {
        remainderLength -= lengths[i];
        if (remainderLength <= 0) {
            segmentIndex = i;
            remainderLength = Math.abs(remainderLength)
            break;
        }
    }

    var p0x = points[(segmentIndex * 2)],
        p0y = points[(segmentIndex * 2) + 1],
        p1x = points[(segmentIndex * 2) + 2],
        p1y = points[(segmentIndex * 2) + 3],
        segT = 1 - (remainderLength / lengths[segmentIndex]);

    out.x = Linear(p0x, p1x, segT);
    out.y = Linear(p0y, p1y, segT);

    return out;
}

export default GetPoint;