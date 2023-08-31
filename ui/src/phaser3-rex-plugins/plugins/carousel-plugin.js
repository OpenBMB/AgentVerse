import Factory from './gameobjects/container/carousel/Factory.js';
import Creator from './gameobjects/container/carousel/Creator.js';
import Carousel from './gameobjects/container/carousel/Carousel.js';
import SetValue from './utils/object/SetValue.js';

class CarouselPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexCarousel', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.Carousel', Carousel);

export default CarouselPlugin;