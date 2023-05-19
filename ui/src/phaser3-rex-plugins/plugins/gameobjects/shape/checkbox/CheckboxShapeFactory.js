import CheckboxShape from './CheckboxShape.js';

export default function (x, y, width, height, color, config) {
    var gameObject = new CheckboxShape(this.scene, x, y, width, height, color, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};