import BuildArcadeObject from './buildarcadeobject.js';

class BuildArcadeObjectPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    build(gameObject, isStatic) {
        return BuildArcadeObject(gameObject, isStatic);
    }
}

export default BuildArcadeObjectPlugin;