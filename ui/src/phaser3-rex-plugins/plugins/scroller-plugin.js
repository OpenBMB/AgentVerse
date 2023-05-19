import Scroller from './scroller.js';

class ScrollerPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new Scroller(gameObject, config);
    }

}

export default ScrollerPlugin;