import AlphaMaskImage from './AlphaMaskImage.js';

export default function (x, y, key, frame, config) {
    var gameObject = new AlphaMaskImage(this.scene, x, y, key, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};