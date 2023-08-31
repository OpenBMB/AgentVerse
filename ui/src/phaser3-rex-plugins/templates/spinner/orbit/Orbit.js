import Base from '../base/Base.js';
import { Circle } from '../utils/Geoms.js'

class Orbit extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerOrbit';
    }

    buildShapes() {
        this.addShape((new Circle()).setName('track'));
        this.addShape((new Circle()).setName('thumb'));
    }

    updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var trackRadius = radius * 0.9;
        var trackThickness = Math.ceil(trackRadius/25);
        var thumbRadius = radius * 0.1;
        var thumbAngle = Math.PI * 2 * this.value;

        this.getShape('track')
            .lineStyle(trackThickness, this.color, 0.7)
            .setRadius(trackRadius)
            .setCenterPosition(centerX, centerY);

        this.getShape('thumb')
            .fillStyle(this.color)
            .setRadius(thumbRadius)
            .setCenterPosition(
                centerX + Math.cos(thumbAngle) * trackRadius,
                centerY + Math.sin(thumbAngle) * trackRadius
            );
    }
}

export default Orbit;