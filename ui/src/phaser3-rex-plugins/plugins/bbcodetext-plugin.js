import Factory from './gameobjects/tagtext/bbcodetext/Factory.js';
import Creator from './gameobjects/tagtext/bbcodetext/Creator.js';
import BBCodeText from './gameobjects/tagtext/bbcodetext/BBCodeText.js';
import SetValue from './utils/object/SetValue.js';

class BBCodeTextPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexBBCodeText', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.BBCodeText', BBCodeText);

export default BBCodeTextPlugin;