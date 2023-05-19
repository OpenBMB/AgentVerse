import ImageCarousel from './ImageCarousel.js';

export default function (x, y, config) {
    var gameObject = new ImageCarousel(this.scene, x, y, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};