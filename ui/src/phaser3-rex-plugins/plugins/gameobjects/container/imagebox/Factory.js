import ImageBox from './ImageBox.js';

export default function (x, y, texture, frame, config) {
    var gameObject = new ImageBox(this.scene, x, y, texture, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};