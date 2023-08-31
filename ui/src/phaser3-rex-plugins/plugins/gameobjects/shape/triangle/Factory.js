import Triangle from './Triangle.js';

export default function (x, y, width, height, fillColor, fillAlpha) {
    var gameObject = new Triangle(this.scene, x, y, width, height, fillColor, fillAlpha);
    this.scene.add.existing(gameObject);
    return gameObject;
};