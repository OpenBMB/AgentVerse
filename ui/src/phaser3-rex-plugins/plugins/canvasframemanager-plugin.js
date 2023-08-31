import CanvasFrameManager from './canvasframemanager.js';

class CanvasFrameManagerPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, key, width, height, cellWidth, cellHeight, fillColor) {
        return new CanvasFrameManager(scene, key, width, height, cellWidth, cellHeight, fillColor);
    }
}

export default CanvasFrameManagerPlugin;