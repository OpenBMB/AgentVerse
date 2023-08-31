import Checkbox from './Checkbox.js';

export default function (x, y, width, height, color, config) {
    var gameObject = new Checkbox(this.scene, x, y, width, height, color, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};