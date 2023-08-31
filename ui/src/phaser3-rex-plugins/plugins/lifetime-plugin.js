import LifeTime from './lifetime.js';

class LifeTimePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new LifeTime(gameObject, config);
    }

}

export default LifeTimePlugin;