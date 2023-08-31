import NinePatch from './NinePatch.js';

const BuildGameObject = Phaser.GameObjects.BuildGameObject;

export default function (config, addToScene) {
    if (config === undefined) { config = {}; }
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var gameObject = new NinePatch(this.scene, config);
    BuildGameObject(this.scene, gameObject, config);
    return gameObject;
};