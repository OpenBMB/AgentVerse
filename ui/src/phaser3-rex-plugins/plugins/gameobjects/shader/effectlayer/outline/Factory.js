import OutlineEffectLayer from './OutlineEffectLayer.js';

export default function (config) {
    var gameObject = new OutlineEffectLayer(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};