import LZString from './lzstring.js';

class LZStringPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        this.lzstring = new LZString();
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    destroy() {
        this.lzstring = null;


        this.pluginManager = null;
        this.game = null;
        this.scene = null;
        this.systems = null;
    }

    add(config) {
        return new LZString(config);
    }
}
export default LZStringPlugin;