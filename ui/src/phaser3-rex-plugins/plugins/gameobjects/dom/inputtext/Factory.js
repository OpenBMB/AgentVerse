import InputText from './InputText.js';

export default function (x, y, width, height, config) {
    var gameObject = new InputText(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};