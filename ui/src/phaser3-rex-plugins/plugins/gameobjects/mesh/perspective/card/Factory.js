import Card from './Card.js';

export default function (x, y, config) {
    var gameObject = new Card(this.scene, x, y, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};