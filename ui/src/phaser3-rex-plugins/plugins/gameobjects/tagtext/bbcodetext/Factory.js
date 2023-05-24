import BBCodeText from './BBCodeText.js';

export default function (x, y, text, style) {
    var gameObject = new BBCodeText(this.scene, x, y, text, style);
    this.scene.add.existing(gameObject);
    return gameObject;
};