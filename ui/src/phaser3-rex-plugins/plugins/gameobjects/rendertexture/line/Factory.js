import Line from './Line.js';

export default function (config) {
    var gameObject = new Line(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
}