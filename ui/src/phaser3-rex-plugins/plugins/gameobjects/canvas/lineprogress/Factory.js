import LineProgress from './LineProgress.js';

export default function (x, y, width, height, barColor, value, config) {
    var gameObject = new LineProgress(this.scene, x, y, width, height, barColor, value, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};