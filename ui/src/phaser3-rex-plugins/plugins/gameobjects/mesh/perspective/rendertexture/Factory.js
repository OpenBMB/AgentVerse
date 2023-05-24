import RenderTexture from './RenderTexture.js';

export default function (x, y, width, height, config) {
    var gameObject = new RenderTexture(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};