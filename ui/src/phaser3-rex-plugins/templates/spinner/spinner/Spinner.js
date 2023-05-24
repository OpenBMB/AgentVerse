import Base from '../base/Base.js';
import { Arc } from '../utils/Geoms.js'
import Yoyo from '../utils/Yoyo.js';

class Spinner extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerSpinner';
    }

    buildShapes() {
        this.addShape((new Arc()).setName('arc'));
    }

    updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var lineWidth = Math.ceil(radius / 10);
        var maxRadius = radius - lineWidth;

        var endAngle = this.value * 720;
        var arcAngle = Yoyo(this.value) * 180;
        var startAngle = endAngle - arcAngle;
        this.getShape('arc')
            .lineStyle(lineWidth, this.color, 1)
            .setRadius(maxRadius)
            .setCenterPosition(centerX, centerY)
            .setAngle(startAngle + 315, endAngle + 315);

    }
}

export default Spinner;