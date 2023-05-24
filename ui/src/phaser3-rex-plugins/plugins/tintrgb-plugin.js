import AddTintRGBProperties from './tintrgb.js';

class TintRGBPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, tintRGB) {
        return AddTintRGBProperties(gameObject, tintRGB)
    }
}

export default TintRGBPlugin;