import VirtualJoyStick from './virtualjoystick.js';

class VirtualJoyStickPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new VirtualJoyStick(scene, config);
    }

}

export default VirtualJoyStickPlugin;