import HitTest from './utils/input/HitTest.js';
import IsPointerInHitArea from './utils/input/IsPointerInHitArea.js';
import IsPointerInBounds from './utils/input/IsPointerInBounds.js';
import TouchGroup from './input/touchgroup/TouchGroup.js';

class TouchHelperPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);

        this.touchGroup = new TouchGroup(this.game);
    }

    destroy() {
        this.touchGroup.destroy();
        super.destroy();
    }

    isAtTop(groupName, key) {
        return this.touchGroup.isAtTop(groupName, key);
    }
}

var methods = {
    hitTest: HitTest,
    isPointerInHitArea: IsPointerInHitArea,
    isPointerInBounds: IsPointerInBounds,
};

// mixin
Object.assign(
    TouchHelperPlugin.prototype,
    methods
);

export default TouchHelperPlugin;