import RealTimeTimers from './realtimetimers.js';

class RealTimeTimersPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new RealTimeTimers(config);
    }

}

export default RealTimeTimersPlugin;