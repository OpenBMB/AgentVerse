import Factory from './gameobjects/container/imagebox/Factory.js';
import Creator from './gameobjects/container/imagebox/Creator.js';
import ImageBox from './gameobjects/container/imagebox/ImageBox.js';
import SetValue from './utils/object/SetValue.js';

class ImageBoxPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexImageBox', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.ImageBox', ImageBox);

export default ImageBoxPlugin;