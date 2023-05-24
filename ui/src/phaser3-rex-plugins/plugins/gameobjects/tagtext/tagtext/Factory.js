import TagText from './TagText.js';

export default function (x, y, text, style) {
    var gameObject = new TagText(this.scene, x, y, text, style);
    this.scene.add.existing(gameObject);
    return gameObject;
}