import Factory from './gameobjects/canvas/canvas/Factory.js';
import Creator from './gameobjects/canvas/canvas/Creator.js';
import Canvas from './gameobjects/canvas/canvas/Canvas.js';
import SetValue from './utils/object/SetValue.js';

class CanvasPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexCanvas', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.Canvas', Canvas);

export default CanvasPlugin;