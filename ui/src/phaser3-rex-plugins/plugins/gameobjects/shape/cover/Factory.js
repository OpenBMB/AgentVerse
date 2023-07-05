import Cover from './Cover.js';

export default function (config) {
    var gameObject = new Cover(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};