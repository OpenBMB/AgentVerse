import Base from '../base/Base.js';
import { Circle } from '../utils/Geoms.js'
import Yoyo from '../utils/Yoyo.js';


class Rings extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerRings';
    }

    buildShapes() {
        for (var i = 0; i < 2; i++) {
            this.addShape(new Circle());
        }
    }

    updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var lineWidth = Math.ceil(radius / 25);
        var maxRingRadius = radius - lineWidth;

        var shapes = this.getShapes();
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
            var ring = shapes[i];
            var t = (this.value + (i / cnt)) % 1;
            var alpha = Yoyo(t);
            ring
                .lineStyle(lineWidth, this.color, alpha)
                .setRadius(t * maxRingRadius)
                .setCenterPosition(centerX, centerY)
        }
    }
}

export default Rings;