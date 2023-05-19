import TransitionImage from './TransitionImage.js';

export default function (x, y, texture, frame, config) {
    var gameObject = new TransitionImage(this.scene, x, y, texture, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};