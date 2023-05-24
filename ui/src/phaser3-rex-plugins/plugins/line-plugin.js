import Factory from './gameobjects/rendertexture/line/Factory.js';
import Creator from './gameobjects/rendertexture/line/Creator.js';
import Line from './gameobjects/rendertexture/line/Line.js';
import SetValue from './utils/object/SetValue.js';

class LinePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexLine', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.Line', Line);

export default LinePlugin;