const DegToRad = Phaser.Math.DegToRad;
const Rad120 = DegToRad(120);

var DrawCircleVerticesTriangle = function (triangle) {
    var triangle = this.getShape('triangle');

    var centerX = this.width / 2,
        centerY = this.height / 2;

    var radius = Math.min(centerX, centerY) * this.radius,
        verticeRotation = this.verticeRotation;

    triangle
        .startAt(
            centerX + radius * Math.cos(verticeRotation + Rad120),
            centerY + radius * Math.sin(verticeRotation + Rad120)
        )
        .lineTo(
            centerX + radius * Math.cos(verticeRotation),
            centerY + radius * Math.sin(verticeRotation)
        )
        .lineTo(
            centerX + radius * Math.cos(verticeRotation - Rad120),
            centerY + radius * Math.sin(verticeRotation - Rad120)
        )

    if (!this.arrowOnly) {
        triangle.close();
    } else {
        triangle.end();
    }

}

export default DrawCircleVerticesTriangle;