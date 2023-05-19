import Perlin from './perlin.js';

class PerlinPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(seed) {
        return new Perlin(seed);
    }

}

export default PerlinPlugin;