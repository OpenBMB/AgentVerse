import LayerManager from './layermanager.js';

class LayerManagerPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new LayerManager(scene, config);
    }
}

export default LayerManagerPlugin;