import BitmapZone from './bitmapzone.js';

class BitmapZonePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(source, config) {
        return new BitmapZone(source, config);
    }
}

export default BitmapZonePlugin;