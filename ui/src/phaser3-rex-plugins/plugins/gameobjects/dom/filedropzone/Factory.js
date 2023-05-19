import FileDropZone from './FileDropZone.js';

export default function (x, y, width, height, config) {
    var gameObject = new FileDropZone(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};