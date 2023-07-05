import Cover from './Cover.js';

const BuildGameObject = Phaser.GameObjects.BuildGameObject;

export default function (config, addToScene) {
    if (config === undefined) { config = {}; }
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var gameObject = new Cover(this.scene, config);

    BuildGameObject(this.scene, gameObject, config);

    return gameObject;
}