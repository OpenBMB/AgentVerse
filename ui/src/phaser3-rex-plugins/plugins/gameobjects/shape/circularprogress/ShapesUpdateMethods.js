import { Arc, Circle } from '../shapes/geoms';

const RadToDeg = Phaser.Math.RadToDeg;

export default {
    buildShapes() {
        this
            .addShape((new Circle()).setName('track'))
            .addShape((new Arc()).setName('bar'))
            .addShape((new Circle()).setName('center'))
    },

    updateShapes() {
        var x = this.radius;
        var lineWidth = this.thickness * this.radius;
        var barRadius = this.radius - (lineWidth / 2);
        var centerRadius = this.radius - lineWidth;

        // Track shape
        var trackShape = this.getShape('track');
        if ((this.trackColor != null) && (lineWidth > 0)) {
            trackShape
                .setCenterPosition(x, x)
                .setRadius(barRadius)
                .lineStyle(lineWidth, this.trackColor);
        } else {
            trackShape.reset();
        }

        // Bar shape
        var barShape = this.getShape('bar');
        if ((this.barColor != null) && (barRadius > 0)) {
            var anticlockwise, startAngle, endAngle;
            if (this.value === 1) {
                anticlockwise = false;
                startAngle = 0;
                endAngle = 361;  // overshoot 1
            } else {
                anticlockwise = this.anticlockwise;
                startAngle = RadToDeg(this.startAngle);
                var deltaAngle = 360 * ((anticlockwise) ? (1 - this.value) : this.value);
                endAngle = deltaAngle + startAngle;
            }
            barShape
                .setCenterPosition(x, x)
                .setRadius(barRadius)
                .setAngle(startAngle, endAngle, anticlockwise)
                .lineStyle(lineWidth, this.barColor);
        } else {
            barShape.reset();
        }

        // Center shape
        var centerShape = this.getShape('center');
        if (this.centerColor && (centerRadius > 0)) {
            centerShape
                .setCenterPosition(x, x)
                .setRadius(centerRadius)
                .fillStyle(this.centerColor);
        } else {
            centerShape.reset();
        }
    }
}