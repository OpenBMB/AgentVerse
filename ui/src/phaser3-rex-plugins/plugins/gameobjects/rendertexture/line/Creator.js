import Line from './Line.js';

const BuildGameObject = Phaser.GameObjects.BuildGameObject;

export default function (config, addToScene) {
    if (config === undefined) { config = {}; }
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var gameObject = new Line(this.scene, config);
    BuildGameObject(this.scene, gameObject, config);
    return gameObject;
};