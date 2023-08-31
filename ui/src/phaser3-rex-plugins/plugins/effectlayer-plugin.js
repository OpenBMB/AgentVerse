import Factory from './gameobjects/shader/effectlayer/effectlayer/Factory.js';
import Creator from './gameobjects/shader/effectlayer/effectlayer/Creator.js';
import EffectLayer from './gameobjects/shader/effectlayer/effectlayer/EffectLayer.js';
import SetValue from './utils/object/SetValue.js';

class EffectLayerPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexEffectLayer', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.EffectLayer', EffectLayer);

export default EffectLayerPlugin;