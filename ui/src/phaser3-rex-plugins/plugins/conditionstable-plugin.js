import ConditionsTable from './conditionstable.js'

class ConditionsTablePlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add() {
        return new ConditionsTable();
    }
}

export default ConditionsTablePlugin;