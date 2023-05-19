import Scale from './scale.js';
import ScaleDown from './behaviors/scale/ScaleDown.js';
import ScaleDownDestroy from './scale-down-destroy.js';
import Popup from './popup.js';
import Yoyo from './behaviors/scale/Yoyo.js';

class ScalePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new Scale(gameObject, config);
    }
}

// mixin
var methods = {
    scaleDown: ScaleDown,
    scaleDownDestroy: ScaleDownDestroy,
    popup: Popup,
    yoyo: Yoyo,
}
Object.assign(
    ScalePlugin.prototype,
    methods
);

export default ScalePlugin;