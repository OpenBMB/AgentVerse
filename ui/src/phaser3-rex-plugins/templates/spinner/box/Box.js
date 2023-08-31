import Base from '../base/Base.js';
import { Lines } from '../utils/Geoms.js';

class Box extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerCube';
    }

    buildShapes() {
        this.addShape((new Lines()).setName('border'));
        this.addShape((new Lines()).setName('fill'));
    }

    updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;

        var halfWidth = radius * 0.7;
        var left = centerX - halfWidth,
            top = centerY - halfWidth,
            width = halfWidth * 2;

        this.getShape('border')
            .lineStyle(2, this.color, 1)
            .startAt(left, top).lineTo(width, 0, true)
            .lineTo(0, width, true).lineTo(-width, 0, true)
            .lineTo(0, -width, true).close();

        if (this.value < 0.5) {
            var t = (0.5 - this.value) * 2;
            var height = width * t;
            this.getShape('fill')
                .fillStyle(this.color, 1)
                .startAt(left, top).lineTo(width, 0, true)
                .lineTo(0, height, true).lineTo(-width, 0, true)
                .lineTo(0, -height, true).close();

        } else { // Rotate
            var t = (this.value - 0.5) * 2;
            var angle = 180 * t;

            this.getShape('border').rotateAround(centerX, centerY, angle);
            this.getShape('fill').fillStyle().lineStyle();
        }
    }
}

export default Box;