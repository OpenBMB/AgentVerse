import FullWindowRectangle from './FullWindowRectangle.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

export default function (config, addToScene) {
    if (config === undefined) { config = {}; }
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var fillColor = GetAdvancedValue(config, 'color', undefined);
    var fillAlpha = GetAdvancedValue(config, 'alpha', undefined);
    var gameObject = new FullWindowRectangle(this.scene, fillColor, fillAlpha);

    BuildGameObject(this.scene, gameObject, config);

    return gameObject;
}