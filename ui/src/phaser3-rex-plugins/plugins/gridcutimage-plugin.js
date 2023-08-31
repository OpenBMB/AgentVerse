import GridCutImage from './gridcutimage';

class GridCutImagePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    gridCut(gameObject, columns, rows, config) {
        return GridCutImage(gameObject, columns, rows, config);
    }
}

export default GridCutImagePlugin;