import CircularProgress from './CircularProgress.js';

export default function (x, y, radius, barColor, value, config) {
    var gameObject = new CircularProgress(this.scene, x, y, radius, barColor, value, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};