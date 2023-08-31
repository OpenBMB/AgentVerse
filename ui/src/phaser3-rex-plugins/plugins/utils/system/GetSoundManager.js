import IsSceneObject from './IsSceneObject.js';

var GetSoundManager = function (game) {
    if (IsSceneObject(game)) {
        return game.sys.sound;
    }
    return game.sound;
}

export default GetSoundManager;