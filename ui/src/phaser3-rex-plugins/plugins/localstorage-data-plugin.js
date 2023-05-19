import DataManager from './localstorage-data.js';
import Extend from './storage/localstorage/data/Extend.js';
import { SetItem, GetItem, RemoveItem } from './storage/localstorage/utils/StorageMethods.js';


class DataManagerPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(parent, eventEmitter, config) {
        return new DataManager(parent, eventEmitter, config);
    }

    extend(dataManager, config) {
        return Extend(dataManager, config);
    }

    setItem(dataKey, name, value) {
        SetItem(dataKey, name, value);
        return this;
    }

    getItem(dataKey, name) {
        return GetItem(dataKey, name);
    }

    removeItem(dataKey, name) {
        RemoveItem(dataKey, name);
        return this;
    }
}

export default DataManagerPlugin;