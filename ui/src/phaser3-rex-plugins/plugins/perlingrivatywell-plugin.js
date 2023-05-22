import PerlinGrivatyWell from './perlingrivatywell.js';

class PerlinGrivatyWellPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new PerlinGrivatyWell(config);
    }

}

export default PerlinGrivatyWellPlugin;