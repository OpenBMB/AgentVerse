import SpiralCurve from './spiralcurve.js';
import SetValue from './utils/object/SetValue.js';

class SpiralCurvePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(x, y, startRadius, endRadius, startAngle, endAngle, rotation) {
        return new SpiralCurve(x, y, startRadius, endRadius, startAngle, endAngle, rotation);
    }
}

SetValue(window, 'RexPlugins.Curve.SpiralCurve', SpiralCurve);

export default SpiralCurvePlugin;