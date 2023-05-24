import Factory from './gameobjects/container/transitionimage/Factory.js';
import Creator from './gameobjects/container/transitionimage/Creator.js';
import TransitionImage from './gameobjects/container/transitionimage/TransitionImage.js';
import SetValue from './utils/object/SetValue.js';

class TransitionImagePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexTransitionImage', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.TransitionImage', TransitionImage);

export default TransitionImagePlugin;