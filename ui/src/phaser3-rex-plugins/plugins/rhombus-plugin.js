import Rhombus from './rhombus.js';

class RhombusPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(x, y, width, height) {
        return new Rhombus(x, y, width, height);
    }
}

export default RhombusPlugin;