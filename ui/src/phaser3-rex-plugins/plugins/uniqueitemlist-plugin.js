import UniqueItemList from './uniqueitemlist.js';

class UniqueItemListPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new UniqueItemList(config);
    }

}

export default UniqueItemListPlugin;