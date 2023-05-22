import Factory from './gameobjects/blitter/ninepatch/Factory.js';
import Creator from './gameobjects/blitter/ninepatch/Creator.js';
import NinePatch from './gameobjects/blitter/ninepatch/NinePatch.js';
import SetValue from './utils/object/SetValue.js';

class NinePatchPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexNinePatch2', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.NinePatch2', NinePatch);

export default NinePatchPlugin;