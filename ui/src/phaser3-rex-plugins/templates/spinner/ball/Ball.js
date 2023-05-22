import Base from '../base/Base.js';
import { Circle } from '../utils/Geoms.js'
import Yoyo from '../utils/Yoyo.js';

const Linear = Phaser.Math.Linear;

class Ball extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerBall';
    }

    buildShapes() {
        for (var i = 0; i < 3; i++) {
            this.addShape(new Circle());
        }
    }

    updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var ballRadius = radius * 0.1;
        var lineWidth = Math.ceil(ballRadius * 0.25);

        var t = 1 - Yoyo(this.value);
        var trackRadius = Linear(0.3, 0.9, t) * radius;

        var shapes = this.getShapes();
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
            var ball = shapes[i];
            var t = (this.value + (i / cnt)) % 1;
            var angle = Math.PI * 2 * t;
            ball
                .lineStyle(lineWidth, this.color)
                .setRadius(ballRadius)
                .setCenterPosition(
                    centerX + Math.cos(angle) * trackRadius,
                    centerY + Math.sin(angle) * trackRadius
                );
        }
    }
}

export default Ball;