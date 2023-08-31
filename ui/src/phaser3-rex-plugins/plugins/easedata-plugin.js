import { EaseData } from './easedata.js';

class EaseDataPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new EaseData(gameObject, config);
    }
}

export default EaseDataPlugin;