import RoundRectangle from './RoundRectangle.js';

export default function (x, y, width, height, radiusConfig, fillColor, fillAlpha) {
    var gameObject = new RoundRectangle(this.scene, x, y, width, height, radiusConfig, fillColor, fillAlpha);
    this.scene.add.existing(gameObject);
    return gameObject;
};