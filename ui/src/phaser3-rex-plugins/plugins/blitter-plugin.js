import Factory from './gameobjects/blitter/blitter/Factory.js';
import Creator from './gameobjects/blitter/blitter/Creator.js';
import Blitter from './gameobjects/blitter/blitter/Blitter.js';
import SetValue from './utils/object/SetValue.js';

class BlitterPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexBlitter', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.Blitter', Blitter);

export default BlitterPlugin;