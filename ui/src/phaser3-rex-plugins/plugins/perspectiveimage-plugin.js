import PerspectiveImageFactory from './gameobjects/mesh/perspective/image/Factory.js';
import PerspectiveImageCreator from './gameobjects/mesh/perspective/image/Creator.js';
import PerspectiveImage from './gameobjects/mesh/perspective/image/Image.js';

import PerspectiveRenderTextureFactory from './gameobjects/mesh/perspective/rendertexture/Factory.js';
import PerspectiveRenderTextureCreator from './gameobjects/mesh/perspective/rendertexture/Creator.js';
import PerspectiveRenderTexture from './gameobjects/mesh/perspective/rendertexture/RenderTexture.js';

import PerspectiveSpriteFactory from './gameobjects/mesh/perspective/sprite/Factory.js';
import PerspectiveSpriteCreator from './gameobjects/mesh/perspective/sprite/Creator.js';
import PerspectiveSprite from './gameobjects/mesh/perspective/sprite/Sprite.js';

import PerspectiveCardFactory from './gameobjects/mesh/perspective/card/Factory.js';
import PerspectiveCardCreator from './gameobjects/mesh/perspective/card/Creator.js';
import PerspectiveCard from './gameobjects/mesh/perspective/card/Card.js';

import PerspectiveCarouselFactory from './gameobjects/mesh/perspective/carousel/Factory.js';
import PerspectiveCarouselCreator from './gameobjects/mesh/perspective/carousel/Creator.js';
import PerspectiveCarousel from './gameobjects/mesh/perspective/carousel/Carousel.js';

import PerspectiveImageCarouselFactory from './gameobjects/mesh/perspective/imagecarousel/Factory';
import PerspectiveImageCarouselCreator from './gameobjects/mesh/perspective/imagecarousel/Creator.js';
import PerspectiveImageCarousel from './gameobjects/mesh/perspective/imagecarousel/ImageCarousel.js';

import ContainerPerspective from './behaviors/containerperspective/ContainerPerspective.js';

import SetValue from './utils/object/SetValue.js';

class PerspectiveImagePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexPerspectiveImage', PerspectiveImageFactory, PerspectiveImageCreator);
        pluginManager.registerGameObject('rexPerspectiveRenderTexture', PerspectiveRenderTextureFactory, PerspectiveRenderTextureCreator);
        pluginManager.registerGameObject('rexPerspectiveSprite', PerspectiveSpriteFactory, PerspectiveSpriteCreator);
        pluginManager.registerGameObject('rexPerspectiveCard', PerspectiveCardFactory, PerspectiveCardCreator);
        pluginManager.registerGameObject('rexPerspectiveCarousel', PerspectiveCarouselFactory, PerspectiveCarouselCreator);
        pluginManager.registerGameObject('rexPerspectiveImageCarousel', PerspectiveImageCarouselFactory, PerspectiveImageCarouselCreator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    addContainerPerspective(parentContainer, config) {
        return new ContainerPerspective(parentContainer, config);
    }
}

SetValue(window, 'RexPlugins.GameObjects.PerspectiveImage', PerspectiveImage);
SetValue(window, 'RexPlugins.GameObjects.PerspectiveRenderTexture', PerspectiveRenderTexture);
SetValue(window, 'RexPlugins.GameObjects.PerspectiveSprite', PerspectiveSprite);
SetValue(window, 'RexPlugins.GameObjects.PerspectiveCard', PerspectiveCard);
SetValue(window, 'RexPlugins.GameObjects.PerspectiveCarousel', PerspectiveCarousel);
SetValue(window, 'RexPlugins.GameObjects.PerspectiveImageCarousel', PerspectiveImageCarousel);

SetValue(window, 'RexPlugins.GameObjects.ContainerPerspective', ContainerPerspective);

export default PerspectiveImagePlugin;