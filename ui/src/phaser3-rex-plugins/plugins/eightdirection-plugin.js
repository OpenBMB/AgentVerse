import EightDirection from './eightdirection.js';

class EightDirectionPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new EightDirection(gameObject, config);
    }

}

export default EightDirectionPlugin;