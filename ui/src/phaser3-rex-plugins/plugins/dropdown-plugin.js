import DropDown from './behaviors/dropdown/DropDown.js';

class DropDownPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new DropDown(gameObject, config);
    }
}

export default DropDownPlugin;