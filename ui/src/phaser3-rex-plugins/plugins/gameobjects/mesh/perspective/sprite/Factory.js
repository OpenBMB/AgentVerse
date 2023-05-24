import Sprite from './Sprite.js';

export default function (x, y, texture, frame, config) {
    var gameObject = new Sprite(this.scene, x, y, texture, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};