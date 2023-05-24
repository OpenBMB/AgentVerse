import Base from '../base/Base.js';
import { Line } from '../utils/Geoms.js';
import Yoyo from '../utils/Yoyo.js';

const Linear = Phaser.Math.Linear;
const ExpoIn = Phaser.Math.Easing.Expo.In;

class Facebook extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerFacebook';
    }

    buildShapes() {
        for (var i = 0; i < 3; i++) {
            var shape = new Line();
            this.addShape(shape);
        }
    }

    updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var leftBound = centerX - radius;

        var shapes = this.getShapes(),
            cnt = shapes.length;
        var cellWidth = (radius * 2) / cnt;
        var cellHeight = radius * 2;

        for (var i = 0; i < cnt; i++) {
            var line = shapes[i];
            var t = (this.value + ((cnt - i) * 0.1)) % 1;
            t = ExpoIn(Yoyo(t));

            var lineAlpha = (i + 1) / cnt;
            var lineHeight = Linear(0.7, 1, t) * cellHeight;
            var lineWidth = Linear(0.7, 1, t) * cellWidth;
            var x = leftBound + (cellWidth * (i + 0.5));

            line
                .lineStyle(lineWidth, this.color, lineAlpha)
                .setP0(x, centerY - (lineHeight / 2))
                .setP1(x, centerY + (lineHeight / 2));
        }
    }
}

export default Facebook;