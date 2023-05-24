import GOManager from '../../gameobject/gomanager/GOManager.js';
import SpriteBob from './SpriteBob.js';
import Methods from './methods/Methods.js';

class SpriteManager extends GOManager {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        config.BobClass = SpriteBob;

        super(scene, config);
    }

    setCreateGameObjectCallback(callback, scope) {
        if (!callback || (callback === 'sprite')) {
            callback = CreateSprite;
        } else if (callback === 'image') {
            callback = CreateImage;
        }
        super.setCreateGameObjectCallback(callback, scope);
        return this;
    }

}

var CreateSprite = function (scene, textureKey, frameName) {
    if ((typeof (frameName) !== 'string') && (typeof (frameName) !== 'number')) {
        frameName = undefined;
    }
    return scene.add.sprite(0, 0, textureKey, frameName);
}

var CreateImage = function (scene, textureKey, frameName) {
    if ((typeof (frameName) !== 'string') && (typeof (frameName) !== 'number')) {
        frameName = undefined;
    }
    return scene.add.image(0, 0, textureKey, frameName);
}

Object.assign(
    SpriteManager.prototype,
    Methods
);

export default SpriteManager;