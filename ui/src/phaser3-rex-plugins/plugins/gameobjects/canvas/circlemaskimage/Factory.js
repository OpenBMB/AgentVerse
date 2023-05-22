import CircleMaskImage from './CircleMaskImage.js';

export default function (x, y, key, frame, config) {
    var gameObject = new CircleMaskImage(this.scene, x, y, key, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};