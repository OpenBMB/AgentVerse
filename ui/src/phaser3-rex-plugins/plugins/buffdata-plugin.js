import DataManager from './data/buff/DataManager.js';
import Extend from './data/buff/Extend.js';

class DataManagerPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(parent, eventEmitter) {
        return new DataManager(parent, eventEmitter);
    }

    extend(dataManager) {
        return Extend(dataManager);
    }
}

export default DataManagerPlugin;