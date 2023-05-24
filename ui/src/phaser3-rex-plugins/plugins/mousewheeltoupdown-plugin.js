import MouseWheelToUpDown from './mousewheeltoupdown.js';

class MouseWheelToUpDownPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new MouseWheelToUpDown(scene, config);
    }

}

export default MouseWheelToUpDownPlugin;