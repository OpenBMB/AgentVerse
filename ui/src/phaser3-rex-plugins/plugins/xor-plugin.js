import XOR from './xor.js';

class XORPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

// mixin
Object.assign(
    XORPlugin.prototype,
    XOR
);

export default XORPlugin;