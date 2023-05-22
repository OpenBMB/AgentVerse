import SkewRenderTexture from './SkewRenderTexture.js';

export default function (x, y, width, height) {
    var gameObject = new SkewRenderTexture(this.scene, x, y, width, height);
    this.scene.add.existing(gameObject);
    return gameObject;
};