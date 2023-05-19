import QuadImageFactory from './gameobjects/mesh/quad/image/Factory.js';
import QuadImageCreator from './gameobjects/mesh/quad/image/Creator.js';
import QuadImage from './gameobjects/mesh/quad/image/Image.js';

import QuadRenderTextureFactory from './gameobjects/mesh/quad/rendertexture/Factory.js';
import QuadRenderTextureCreator from './gameobjects/mesh/quad/rendertexture/Creator.js';
import QuadRenderTexture from './gameobjects/mesh/quad/rendertexture/RenderTexture.js';

import SkewImageFactory from './gameobjects/mesh/quad/skewimage/Factory';
import SkewImageCreator from './gameobjects/mesh/quad/skewimage/Creator.js';
import SkewImage from './gameobjects/mesh/quad/skewimage/SkewImage.js';

import SkewRenderTextureFactory from './gameobjects/mesh/quad/skewrendertexture/Factory.js';
import SkewRenderTextureCreator from './gameobjects/mesh/quad/skewrendertexture/Creator.js';
import SkewRenderTexture from './gameobjects/mesh/quad/skewrendertexture/SkewRenderTexture.js';

import ContainerSkew from './behaviors/containerskew/ContainerSkew.js';

import SetValue from './utils/object/SetValue.js';

class QuadImagePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexQuadImage', QuadImageFactory, QuadImageCreator);
        pluginManager.registerGameObject('rexQuadRenderTexture', QuadRenderTextureFactory, QuadRenderTextureCreator);

        pluginManager.registerGameObject('rexSkewImage', SkewImageFactory, SkewImageCreator);
        pluginManager.registerGameObject('rexSkewRenderTexture', SkewRenderTextureFactory, SkewRenderTextureCreator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    addContainerSkew(parentContainer, config) {
        return new ContainerSkew(parentContainer, config);
    }
}

SetValue(window, 'RexPlugins.GameObjects.QuadImage', QuadImage);
SetValue(window, 'RexPlugins.GameObjects.QuadRenderTexture', QuadRenderTexture);
SetValue(window, 'RexPlugins.GameObjects.SkewImage', SkewImage);
SetValue(window, 'RexPlugins.GameObjects.SkewRenderTexture', SkewRenderTexture);

SetValue(window, 'RexPlugins.GameObjects.ContainerSkew', ContainerSkew);

export default QuadImagePlugin;