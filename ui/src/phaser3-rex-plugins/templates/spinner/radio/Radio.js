import Base from '../base/Base.js';
import { Circle, Lines } from '../utils/Geoms.js';
import Yoyo from '../utils/Yoyo.js';

const Linear = Phaser.Math.Linear;
const ExpoIn = Phaser.Math.Easing.Expo.In;

class Radio extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerRadio';
    }

    buildShapes() {
        this.addShape((new Circle()).setName('center'));
        this.addShape((new Lines()).setName('arc0'));
        this.addShape((new Lines()).setName('arc1'));
    }

    updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var isSizeChanged = this.isSizeChanged;

        var centerRadius = (radius * 2) / 6;
        var x = centerX - radius + centerRadius;
        var y = centerY + radius - centerRadius;

        var shapes = this.getShapes();
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
            var shape = shapes[i];

            var t = (this.value + ((cnt - i) * 0.1)) % 1;
            t = ExpoIn(Yoyo(t));

            switch (shape.name) {
                case 'center':
                    shape.fillStyle(this.color, Linear(0.25, 1, t))

                    if (isSizeChanged) {
                        shape
                            .setRadius(centerRadius)
                            .setCenterPosition(x, y);
                    }
                    break;
                case 'arc0':
                    shape.fillStyle(this.color, Linear(0.25, 1, t));

                    if (isSizeChanged) {
                        var radius0 = centerRadius * 2,
                            radius1 = centerRadius * 3;
                        shape
                            .startAt(x, y - radius0)
                            .lineTo(x, y - radius1)
                            .setIterations(8).arc(x, y, radius1, 270, 360)
                            .lineTo(x + radius0, y)
                            .setIterations(6).arc(x, y, radius0, 360, 270, true)
                            .close();
                    }
                    break;
                case 'arc1':
                    shape.fillStyle(this.color, Linear(0.25, 1, t));

                    if (isSizeChanged) {
                        var radius0 = centerRadius * 4,
                            radius1 = centerRadius * 5;
                        shape
                            .startAt(x, y - radius0)
                            .lineTo(x, y - radius1)
                            .setIterations(8).arc(x, y, radius1, 270, 360)
                            .lineTo(x + radius0, y)
                            .setIterations(6).arc(x, y, radius0, 360, 270, true)
                            .close();
                    }
                    break;
            }
        }
    }
}

export default Radio;