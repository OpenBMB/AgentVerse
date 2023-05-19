import CustomShapes from './CustomShapes.js';

export default function (x, y, width, height, config) {
    var gameObject = new CustomShapes(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};