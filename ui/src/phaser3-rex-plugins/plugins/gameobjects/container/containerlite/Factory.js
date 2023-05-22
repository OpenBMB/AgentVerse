import ContainerLite from './ContainerLite.js';

export default function (x, y, width, height, children) {
    var gameObject = new ContainerLite(this.scene, x, y, width, height, children);
    this.scene.add.existing(gameObject);
    return gameObject;
};