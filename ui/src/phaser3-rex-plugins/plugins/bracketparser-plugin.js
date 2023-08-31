import BracketParser from './bracketparser.js';

class BracketParserPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new BracketParser(config);
    }
}

export default BracketParserPlugin;