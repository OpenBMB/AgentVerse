import DragRotate from './dragrotate.js';

class DragRotatePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new DragRotate(scene, config);
    }

}

export default DragRotatePlugin;