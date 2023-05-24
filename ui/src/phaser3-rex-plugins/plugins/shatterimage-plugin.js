import ShatterImageFactory from './gameobjects/mesh/shatter/image/Factory.js';
import ShatterImageCreator from './gameobjects/mesh/shatter/image/Creator.js';
import ShatterImage from './gameobjects/mesh/shatter/image/Image.js';

import ShatterRenderTextureFactory from './gameobjects/mesh/shatter/rendertexture/Factory.js';
import ShatterRenderTextureCreator from './gameobjects/mesh/shatter/rendertexture/Creator.js';
import ShatterRenderTexture from './gameobjects/mesh/shatter/rendertexture/RenderTexture.js';

import SetValue from './utils/object/SetValue.js';

class ShatterImagePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexShatterImage', ShatterImageFactory, ShatterImageCreator);
        pluginManager.registerGameObject('rexShatterRenderTexture', ShatterRenderTextureFactory, ShatterRenderTextureCreator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.ShatterImage', ShatterImage);
SetValue(window, 'RexPlugins.GameObjects.ShatterRenderTexture', ShatterRenderTexture);

export default ShatterImagePlugin;