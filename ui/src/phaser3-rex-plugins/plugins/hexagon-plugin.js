import Hexagon from './hexagon.js';

class HexagonPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(x, y, size, type) {
        return new Hexagon(x, y, size, type);
    }
}

export default HexagonPlugin;