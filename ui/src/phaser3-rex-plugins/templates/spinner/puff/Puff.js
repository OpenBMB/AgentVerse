import Base from '../base/Base.js';
import { Circle } from '../utils/Geoms.js';
import Yoyo from '../utils/Yoyo.js';


class Puff extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerPuff';
    }

    buildShapes() {
        this.addShape(new Circle());
    }

    updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var puffRadius = radius * this.value;
        var lineWidth = Math.ceil(radius / 25);
        var alpha = Yoyo(this.value);

        this.getShapes()[0]
            .lineStyle(lineWidth, this.color, alpha)
            .setRadius(puffRadius)
            .setCenterPosition(centerX, centerY)
    }
}

export default Puff;