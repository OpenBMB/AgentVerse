import CSVToHashTable from './csvtohashtable.js';

class CSVToHashTablePlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new CSVToHashTable(config);
    }
}

export default CSVToHashTablePlugin;