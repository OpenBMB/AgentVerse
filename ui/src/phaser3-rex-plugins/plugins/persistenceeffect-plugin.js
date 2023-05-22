import Factory from './gameobjects/blitter/persistenceeffect/Factory.js';
import Creator from './gameobjects/blitter/persistenceeffect/Creator.js';
import PersistenceEffect from './gameobjects/blitter/persistenceeffect/PersistenceEffect.js';
import SetValue from './utils/object/SetValue.js';

class PersistenceEffectPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexPersistenceEffect', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.PersistenceEffect', PersistenceEffect);

export default PersistenceEffectPlugin;