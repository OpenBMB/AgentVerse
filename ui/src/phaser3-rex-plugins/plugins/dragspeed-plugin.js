import DragSpeed from './dragspeed.js';

class DragSpeedPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new DragSpeed(gameObject, config);
    }

}

export default DragSpeedPlugin;