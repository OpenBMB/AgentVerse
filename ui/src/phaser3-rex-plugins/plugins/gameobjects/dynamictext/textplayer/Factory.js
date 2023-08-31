import TextPlayer from './TextPlayer.js'

export default function (x, y, width, height, config) {
    var gameObject = new TextPlayer(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};