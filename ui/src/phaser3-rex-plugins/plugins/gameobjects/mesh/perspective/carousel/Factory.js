import Carousel from './Carousel.js';

export default function (x, y, config) {
    var gameObject = new Carousel(this.scene, x, y, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};