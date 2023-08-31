import {
    HexagonGridAlign,
    QuadGridAlign
} from './gridalign.js';

class GridAlignPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    hexagon(items, options) {
        return HexagonGridAlign(items, options);
    }

    quad(items, options) {
        return QuadGridAlign(items, options);
    }
}

export default GridAlignPlugin;