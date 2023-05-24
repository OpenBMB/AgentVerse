import Blitter from './Blitter.js';

export default function (x, y, texture, frame, config) {
    var gameObject = new Blitter(this.scene, x, y, texture, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};