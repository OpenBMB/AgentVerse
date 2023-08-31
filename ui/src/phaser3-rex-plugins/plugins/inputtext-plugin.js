import Factory from './gameobjects/dom/inputtext/Factory.js';
import Creator from './gameobjects/dom/inputtext/Creator.js';
import InputText from './gameobjects/dom/inputtext/InputText.js';
import SetValue from './utils/object/SetValue.js';

class InputTextPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexInputText', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.InputText', InputText);

export default InputTextPlugin;