import {
    Live2dCoreScriptFileCallback,
    Live2dFileCallback,
    Live2dGameObject
} from './gameobjects/live2d/index.js';

Phaser.Loader.FileTypesManager.register('rexLive2dCoreScript', Live2dCoreScriptFileCallback);
Phaser.Loader.FileTypesManager.register('rexLive2d', Live2dFileCallback);

export {
    Live2dCoreScriptFileCallback,
    Live2dFileCallback,
    Live2dGameObject
};