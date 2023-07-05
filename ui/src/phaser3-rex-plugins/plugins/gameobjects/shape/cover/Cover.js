import FullWindowRectangle from '../fullwindowrectangle/FullWindowRectangle.js';
import TouchEventStop from '../../../input/toucheventstop/TouchEventStop.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Cover extends FullWindowRectangle {
    constructor(scene, config) {
        var fillColor = GetValue(config, 'color', 0x0);
        var fillAlpha = GetValue(config, 'alpha', 0.8);
        super(scene, fillColor, fillAlpha);

        this.touchEventStop = new TouchEventStop(this, { hitAreaMode: 1 });
    }
}

export default Cover;