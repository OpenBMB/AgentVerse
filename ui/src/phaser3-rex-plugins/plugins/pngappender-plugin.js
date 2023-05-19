import PNGAppender from './pngappender.js';

class PNGAppenderPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

// mixin
Object.assign(
    PNGAppenderPlugin.prototype,
    PNGAppender
);

export default PNGAppenderPlugin;