import ClickOutside from './clickoutside';

class ClickOutsidePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new ClickOutside(gameObject, config);
    }

}

export default ClickOutsidePlugin;