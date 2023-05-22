import TextTyping from './texttyping.js';

class TextTypingPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new TextTyping(gameObject, config);
    }

}

export default TextTypingPlugin;