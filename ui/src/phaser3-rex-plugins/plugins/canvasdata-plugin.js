import Methods from './canvasdata.js';

const CanvasPool = Phaser.Display.Canvas.CanvasPool;

class CanvasDataPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);

        this._tmpCanvas = CanvasPool.create2D(this);
    }

    destroy() {
        CanvasPool.remove(this._tmpCanvas);
        this._tmpCanvas = undefined;
        super.destroy();
    }

    get textureManager() {
        return this.game.textures;
    }
}

Object.assign(
    CanvasDataPlugin.prototype,
    Methods
);

export default CanvasDataPlugin;