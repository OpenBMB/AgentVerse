import InTouching from './intouching.js';

class InTouchingPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new InTouching(gameObject, config);
    }

}

export default InTouchingPlugin;