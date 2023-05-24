import Factory from './gameobjects/shape/cover/Factory.js';
import Creator from './gameobjects/shape/cover/Creator.js';
import Cover from './gameobjects/shape/cover/Cover.js';
import SetValue from './utils/object/SetValue.js';

class CoverPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexCover', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.Cover', Cover);

export default CoverPlugin;