import Factory from './gameobjects/dynamictext/dynamictext/Factory';
import Creator from './gameobjects/dynamictext/dynamictext/Creator.js';
import DynamicText from './gameobjects/dynamictext/dynamictext/DynamicText.js';
import SetValue from './utils/object/SetValue.js';

class DynamicTextPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexDynamicText', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.DynamicText', DynamicText);

export default DynamicTextPlugin;