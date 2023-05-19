import Carousel from './Carousel.js';

export default function (x, y, width, height, config) {
    var gameObject = new Carousel(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};