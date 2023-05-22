import TouchEventStop from './toucheventstop.js'

class TouchEventStopPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new TouchEventStop(gameObject, config);
    }
}

export default TouchEventStopPlugin;