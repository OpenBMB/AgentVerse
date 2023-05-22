import EffectLayer from './EffectLayer.js';

export default function (key, x, y, width, height) {
    var gameObject = new EffectLayer(this.scene, key, x, y, width, height);
    this.scene.add.existing(gameObject);
    return gameObject;
};