import SkewImage from './SkewImage.js';

export default function (x, y, texture, frame) {
    var gameObject = new SkewImage(this.scene, x, y, texture, frame);
    this.scene.add.existing(gameObject);
    return gameObject;
};