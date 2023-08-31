import Base from '../base/Base.js';
import { Line } from '../utils/Geoms.js'

const Linear = Phaser.Math.Linear;

class Los extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerLos';
    }

    buildShapes() {
        for (var i = 0; i < 12; i++) {
            this.addShape(new Line());
        }
    }

    updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var isSizeChanged = this.isSizeChanged;

        var radius = this.radius;
        var startRadius = radius / 2;
        var lineWidth = Math.ceil(radius / 20);
        var shapes = this.getShapes();
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
            var line = shapes[i];
            var t = i / cnt;
            var angle = Math.PI * 2 * t;
            var alpha = Linear(0.25, 1, (1 - this.value + t) % 1);
            line.lineStyle(lineWidth, this.color, alpha);

            if (isSizeChanged) {
                line
                    .setP0(
                        centerX + Math.cos(angle) * startRadius,
                        centerY + Math.sin(angle) * startRadius
                    )
                    .setP1(
                        centerX + Math.cos(angle) * radius,
                        centerY + Math.sin(angle) * radius
                    )
            }
        }
    }
}

export default Los;