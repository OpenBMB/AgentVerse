import CanvasInputFactory from './gameobjects/dynamictext/canvasinput/Factory';
import CanvasInputCreator from './gameobjects/dynamictext/canvasinput/Creator.js';
import CanvasInput from './gameobjects/dynamictext/canvasinput/CanvasInput.js';

import SetValue from './utils/object/SetValue.js';

class CanvasInputPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexCanvasInput', CanvasInputFactory, CanvasInputCreator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.CanvasInput', CanvasInput);

export default CanvasInputPlugin;