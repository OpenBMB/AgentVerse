import Raycaster from './raycaster.js';

class RaycasterPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new Raycaster(config);
    }
}

export default RaycasterPlugin;