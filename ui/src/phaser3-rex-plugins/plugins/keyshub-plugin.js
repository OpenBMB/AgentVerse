import KeysHub from './keyshub.js';

class KeysHubPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new KeysHub(scene, config);
    }

}

export default KeysHubPlugin;