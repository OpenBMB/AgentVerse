import StateManager from './statemanager.js';
import SetValue from './utils/object/SetValue.js';

class StateManagerPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new StateManager(config);
    }

}

SetValue(window, 'RexPlugins.StateManager', StateManager);

export default StateManagerPlugin;