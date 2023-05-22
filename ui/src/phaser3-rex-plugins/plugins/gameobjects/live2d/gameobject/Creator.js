import Live2dGameObject from './Live2dGameObject.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

export default function (config, addToScene) {
    if (config === undefined) { config = {}; }
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var key = GetAdvancedValue(config, 'key');
    var gameObject = new Live2dGameObject(this.scene, 0, 0, key);
    BuildGameObject(this.scene, gameObject, config);
    return gameObject;
};