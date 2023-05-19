import { Lines, RoundRectangle } from '../../shapes/geoms';

export default {
    buildShapes() {
        this
            .addShape(new RoundRectangle().setName('box'))
            .addShape(new Lines().setName('checker'))
    },

    updateShapes() {
        var centerX = this.width / 2,
            centerY = this.height / 2,
            radius = Math.min(centerX, centerY);
        var width = radius * 2;
        var x = centerX - radius,
            y = centerY - radius;

        var boxLineWidth = this.boxLineWidth;
        var checkLineWidth = Math.max(width / 10, 2);

        var boxShape = this.getShape('box');
        var checkerShape = this.getShape('checker');

        // Setup shapes
        if (this.isSizeChanged) {
            // Box
            var posOffset = width * (1 - this.boxSize) / 2;
            var halfBoxLineWidth = boxLineWidth / 2;
            var boxInnerWidth = (width * this.boxSize) - boxLineWidth;
            boxShape
                .setTopLeftPosition(x + halfBoxLineWidth + posOffset, y + halfBoxLineWidth + posOffset)
                .setSize(boxInnerWidth, boxInnerWidth)

            if (this.isCircleShape) {
                boxShape.setRadius(boxInnerWidth / 2);
            } else {
                boxShape.setRadius(0);
            }

            // Checker
            var posOffset = width * (1 - this.checkerSize) / 2;
            var unit = (width * this.checkerSize) / 4;
            var u0 = 0, u1 = unit * 1, u2 = unit * 2, u3 = unit * 3;
            checkerShape
                .startAt(u1, u2)
                .lineTo(u2, u3)
                .lineTo(u3, u1)
                .offset(x + posOffset, y + posOffset)
                .end()
        }

        // Set styles
        if (this.checked) {
            boxShape
                .fillStyle(this.boxFillColor, this.boxFillAlpha)
                .lineStyle(boxLineWidth, this.boxStrokeColor, this.boxStrokeAlpha)

            checkerShape
                .lineStyle(checkLineWidth, this.checkerColor)
        } else {
            boxShape
                .fillStyle(this.uncheckedBoxFillColor, this.uncheckedBoxFillAlpha)
                .lineStyle(boxLineWidth, this.uncheckedBoxStrokeColor, this.uncheckedBoxStrokeAlpha)

            checkerShape
                .lineStyle()
        }

        // Play checker animation
        if (this.checked) {
            checkerShape.setDisplayPathSegment(this.checkerAnimProgress);
        }
    }
}