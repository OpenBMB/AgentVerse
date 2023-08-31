import FSM from './fsm.js';
import SetValue from './utils/object/SetValue.js';

class FSMPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new FSM(config);
    }

}

SetValue(window, 'RexPlugins.FSM', FSM);

export default FSMPlugin;