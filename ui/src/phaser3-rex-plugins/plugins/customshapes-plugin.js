import Factory from './gameobjects/shape/customshapes/Factory.js';
import Creator from './gameobjects/shape/customshapes/Creator.js';
import CustomShapes from './gameobjects/shape/customshapes/CustomShapes.js';
import SetValue from './utils/object/SetValue.js';

class CustomShapesPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexCustomShapes', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.CustomShapes', CustomShapes);

export default CustomShapesPlugin;