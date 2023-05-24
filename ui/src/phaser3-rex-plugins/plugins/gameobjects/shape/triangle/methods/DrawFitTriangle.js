const Wrap = Phaser.Math.Wrap;
const Linear = Phaser.Math.Linear;

var DrawFitTriangle = function () {
    var triangle = this.getShape('triangle');

    var padding = this.padding;
    var right = this.width - padding.right;
    var left = 0 + padding.left;
    var bottom = this.height - padding.bottom;
    var top = 0 + padding.top;
    var centerX = (left + right) / 2;
    var centerY = (top + bottom) / 2;

    var points = {
        0: {  // right
            a: { x: left, y: top }, b: { x: right, y: centerY }, c: { x: left, y: bottom },
        },
        1: {  // down
            a: { x: left, y: top }, b: { x: centerX, y: bottom }, c: { x: right, y: top },
        },
        2: {  // left
            a: { x: right, y: top }, b: { x: left, y: centerY }, c: { x: right, y: bottom },
        },
        3: {  // up
            a: { x: left, y: bottom }, b: { x: centerX, y: top }, c: { x: right, y: bottom },
        }
    }

    var pax, pay, pbx, pby, pcx, pcy;
    if (this.previousDirection === undefined) {
        var currentTrianglePoints = points[this.direction];
        var pa = currentTrianglePoints.a,
            pb = currentTrianglePoints.b,
            pc = currentTrianglePoints.c;

        pax = pa.x; pay = pa.y;
        pbx = pb.x; pby = pb.y;
        pcx = pc.x; pcy = pc.y;

    } else {
        var p0 = points[this.previousDirection];
        var p1 = points[this.direction];
        var t = this.easeDirectionProgress;
        pax = Linear(p0.a.x, p1.a.x, t);
        pay = Linear(p0.a.y, p1.a.y, t);
        pbx = Linear(p0.b.x, p1.b.x, t);
        pby = Linear(p0.b.y, p1.b.y, t);
        pcx = Linear(p0.c.x, p1.c.x, t);
        pcy = Linear(p0.c.y, p1.c.y, t);
    }

    triangle.startAt(pax, pay).lineTo(pbx, pby).lineTo(pcx, pcy);

    if (!this.arrowOnly) {
        triangle.close();
    } else {
        triangle.end();
    }

}
export default DrawFitTriangle;