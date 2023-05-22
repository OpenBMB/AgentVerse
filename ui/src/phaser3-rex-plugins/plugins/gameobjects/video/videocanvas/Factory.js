import VideoCanvas from './VideoCanvas.js';

export default function (x, y, width, height, config) {
    var gameObject = new VideoCanvas(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
}