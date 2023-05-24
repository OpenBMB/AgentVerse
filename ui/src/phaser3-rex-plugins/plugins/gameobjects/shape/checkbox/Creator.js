import Checkbox from './Checkbox.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

export default function (config, addToScene) {
    if (config === undefined) { config = {}; }
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var width = GetAdvancedValue(config, 'width', undefined);
    var height = GetAdvancedValue(config, 'height', width);
    var color = GetAdvancedValue(config, 'color', 0x005cb2);
    var gameObject = new Checkbox(this.scene, 0, 0, width, height, color, config);

    BuildGameObject(this.scene, gameObject, config);

    return gameObject;
}