import MouseWheelScroller from './mousewheelscroller.js';

class MouseWheelScrollerPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new MouseWheelScroller(gameObject, config);
    }

}

export default MouseWheelScrollerPlugin;