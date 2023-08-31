import DynamicText from './DynamicText.js'

export default function (x, y, width, height, config) {
    var gameObject = new DynamicText(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};