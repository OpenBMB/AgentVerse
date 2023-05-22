import FileChooser from './FileChooser.js';

export default function (x, y, width, height, config) {
    var gameObject = new FileChooser(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};