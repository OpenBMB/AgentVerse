import CustomProgress from './CustomProgress.js';

export default function (x, y, width, height, config) {
    var gameObject = new CustomProgress(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};