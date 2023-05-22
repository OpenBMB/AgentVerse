import RotateTo from './rotateto.js';

class RotateToPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new RotateTo(gameObject, config);
    }
}

export default RotateToPlugin;