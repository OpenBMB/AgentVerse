import Factory from './gameobjects/shape/toggleswitch/Factory.js';
import Creator from './gameobjects/shape/toggleswitch/Creator.js';
import ToggleSwitch from './gameobjects/shape/toggleswitch/ToggleSwitch.js';
import ToggleSwitchShapeFactory from './gameobjects/shape/toggleswitch/ToggleSwitchShapeFactory.js';
import ToggleSwitchShapeCreator from './gameobjects/shape/toggleswitch/ToggleSwitchShapeCreator.js';
import ToggleSwitchShape from './gameobjects/shape/toggleswitch/ToggleSwitchShape.js';
import SetValue from './utils/object/SetValue.js';

class ToggleSwitchPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexToggleSwitch', Factory, Creator);
        pluginManager.registerGameObject('rexToggleSwitchShape', ToggleSwitchShapeFactory, ToggleSwitchShapeCreator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.ToggleSwitch', ToggleSwitch);
SetValue(window, 'RexPlugins.GameObjects.ToggleSwitchShape', ToggleSwitchShape);

export default ToggleSwitchPlugin;