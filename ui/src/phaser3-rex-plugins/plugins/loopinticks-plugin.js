import LoopInTicks from './loopinticks.js'

class LoopInTicksPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new LoopInTicks(scene, config);
    }
}

export default LoopInTicksPlugin;