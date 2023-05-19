import RoundRectangle from './RoundRectangle.js';

export default function (x, y, width, height, radius, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient) {
    var gameObject = new RoundRectangle(this.scene, x, y, width, height, radius, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient);
    this.scene.add.existing(gameObject);
    return gameObject;
};