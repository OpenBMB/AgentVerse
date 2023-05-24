import Factory from './gameobjects/tagtext/tagtext/Factory.js';
import Creator from './gameobjects/tagtext/tagtext/Creator.js';
import TagText from './gameobjects/tagtext/tagtext/TagText.js';
import SetValue from './utils/object/SetValue.js';

class TagTextPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexTagText', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.TagText', TagText);

export default TagTextPlugin;