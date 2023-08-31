import Canvas from './Canvas.js';

export default function (x, y, width, height) {
    var gameObject = new Canvas(this.scene, x, y, width, height);
    this.scene.add.existing(gameObject);
    return gameObject;
};