import Base from '../base/Base.js';
import { Line } from '../utils/Geoms.js';

const Linear = Phaser.Math.Linear;

class Audio extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerAudio';
    }

    buildShapes() {
        for (var i = 0; i < 4; i++) {
            this.addShape(new Line());
        }
        this.prevValue = undefined;
    }

    updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var leftBound = centerX - radius;
        var bottomBound = centerY + radius;
        var maxLineHeight = radius * 2;

        var shapes = this.getShapes(),
            cnt = shapes.length;
        var cellWidth = (radius * 2) / cnt;
        var lineWidth = cellWidth * 0.7;

        // Reset range of value
        if ((this.prevValue === undefined) || (this.prevValue > this.value)) {
            for (var i = 0; i < cnt; i++) {
                var line = shapes[i];
                var from = (this.prevValue === undefined) ? Math.random() : line.getData('to');
                line
                    .setData('from', from)
                    .setData('to', Math.random())
            }
        }
        this.prevValue = this.value;

        for (var i = 0; i < cnt; i++) {
            var line = shapes[i];
            var from = line.getData('from'),
                to = line.getData('to'),
                current = Linear(from, to, this.value);
            var lineHeight = current * maxLineHeight;
            var x = leftBound + (cellWidth * (i + 0.5));

            line
                .lineStyle(lineWidth, this.color, 1)
                .setP0(x, bottomBound)
                .setP1(x, (bottomBound - lineHeight));

        }
    }
}

export default Audio;