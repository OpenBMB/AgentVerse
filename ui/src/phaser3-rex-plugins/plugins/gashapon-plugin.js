import Gashapon from './gashapon.js';

class GashaponPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new Gashapon(config);
    }
}

export default GashaponPlugin;