import NinePatch from './NinePatch.js';

export default function (x, y, width, height, key, baseFrame, columns, rows, config) {
    var gameObject = new NinePatch(this.scene, x, y, width, height, key, baseFrame, columns, rows, config);
    this.scene.add.existing(gameObject);
    return gameObject;
}