import Factory from './gameobjects/live2d/gameobject/Factory.js';
import Creator from './gameobjects/live2d/gameobject/Creator.js';
import {
    Live2dCoreScriptFileCallback,
    Live2dFileCallback,
    Live2dGameObject
} from './gameobjects/live2d/index.js';
import SetValue from './utils/object/SetValue.js';

class Live2dPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        var game = pluginManager.game;

        var isWebGL = (game.config.renderType === 2);

        if (!isWebGL) {
            console.error('Live2d can\'t run in CANVAS render mode.')
        }

        // Register new file type to loader, to load live2d core script file (live2dcubismcore.min.js)
        pluginManager.registerFileType('rexLive2dCoreScript', Live2dCoreScriptFileCallback);

        // Register new file type to loader, to load live2d model assets
        pluginManager.registerFileType('rexLive2d', Live2dFileCallback);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexLive2d', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.Live2d', Live2dGameObject);

export default Live2dPlugin;