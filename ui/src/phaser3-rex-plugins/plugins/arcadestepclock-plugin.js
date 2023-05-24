import ArcadeStepClock from './ArcadeStepClock.js';

class ArcadeStepClockPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new ArcadeStepClock(scene, config);
    }

}

export default ArcadeStepClockPlugin;