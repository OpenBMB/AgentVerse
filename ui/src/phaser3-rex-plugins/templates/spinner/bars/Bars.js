import Base from '../base/Base.js';
import { Line } from '../utils/Geoms.js';
import Yoyo from '../utils/Yoyo.js';

const Linear = Phaser.Math.Linear;
const ExpoIn = Phaser.Math.Easing.Expo.In;

class Bars extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerBars';
    }

    buildShapes() {
        var cnt = 5;
        for (var i = 0; i < cnt; i++) {
            var line = new Line();
            this.addShape(line);
            var offset = Yoyo(i / (cnt - 1)) / 2;
            line.setData('offset', offset);
        }
    }

    updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var leftBound = centerX - radius;
        var maxLineHeight = radius * 2;

        var shapes = this.getShapes(),
            cnt = shapes.length;
        var cellWidth = (radius * 2) / cnt;
        var lineWidth = cellWidth * 0.7;


        for (var i = 0; i < cnt; i++) {
            var line = shapes[i];
            var t = (this.value + line.getData('offset')) % 1;
            t = ExpoIn(Yoyo(t));

            var lineHeight = Linear(0.4, 1, t) * maxLineHeight;
            var x = leftBound + (cellWidth * (i + 0.5))

            line
                .lineStyle(lineWidth, this.color, 1)
                .setP0(x, (centerY - (lineHeight / 2)))
                .setP1(x, (centerY + (lineHeight / 2)));

        }
    }
}

export default Bars;