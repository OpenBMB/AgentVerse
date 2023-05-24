import Factory from './gameobjects/dynamictext/textplayer/Factory';
import Creator from './gameobjects/dynamictext/textplayer/Creator.js';
import TextPlayer from './gameobjects/dynamictext/textplayer/TextPlayer.js';
import SetValue from './utils/object/SetValue.js';

class DynamicTextPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexTextPlayer', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.TextPlayer', TextPlayer);

export default DynamicTextPlugin;