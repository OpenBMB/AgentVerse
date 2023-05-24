import AddViewportCoordinateProperties from './viewportcoordinate.js';
import { VPXYToXY } from './viewportcoordinate.js';

class ViewportCoordinatePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, viewport, vpx, vpy, transformCallback) {
        return AddViewportCoordinateProperties(gameObject, viewport, vpx, vpy, transformCallback);
    }

    vpxyToxy(vpx, vpy, viewport, out) {
        return VPXYToXY(vpx, vpy, viewport, out);
    }
}

export default ViewportCoordinatePlugin;