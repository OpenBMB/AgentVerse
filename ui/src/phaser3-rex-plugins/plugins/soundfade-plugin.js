import SoundFade from './soundfade.js';

class SoundFadePlugin extends Phaser.Plugins.BasePlugin {
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
    SoundFadePlugin.prototype,
    SoundFade
);

export default SoundFadePlugin;