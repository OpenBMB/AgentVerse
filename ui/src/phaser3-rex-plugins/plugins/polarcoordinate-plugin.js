import AddPolarCoordinateProperties from './polarcoordinate.js';

class PolarCoordinatePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, ox, oy, rotation, radius) {
        return AddPolarCoordinateProperties(gameObject, ox, oy, rotation, radius)
    }
}

export default PolarCoordinatePlugin;