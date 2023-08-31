import FullWindowRectangle from './FullWindowRectangle.js';

export default function (fillColor, fillAlpha) {
    var gameObject = new FullWindowRectangle(this.scene, fillColor, fillAlpha);
    this.scene.add.existing(gameObject);
    return gameObject;
};