import TouchCursor from './touchcursor.js';

class TouchCursorPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new TouchCursor(gameObject, config);
    }

}

export default TouchCursorPlugin;