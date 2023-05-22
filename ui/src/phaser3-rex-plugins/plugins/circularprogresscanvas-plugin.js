import Factory from './gameobjects/canvas/circularprogress/Factory.js';
import Creator from './gameobjects/canvas/circularprogress/Creator.js';
import CircularProgressCanvas from './gameobjects/canvas/circularprogress/CircularProgress.js';
import SetValue from './utils/object/SetValue.js';

class CircularProgressCanvasPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexCircularProgressCanvas', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.CircularProgressCanvas', CircularProgressCanvas);

export default CircularProgressCanvasPlugin;