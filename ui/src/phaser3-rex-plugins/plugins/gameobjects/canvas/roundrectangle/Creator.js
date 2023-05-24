import RoundRectangle from './RoundRectangle.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

export default function (config, addToScene) {
    if (config === undefined) { config = {}; }
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var width = GetAdvancedValue(config, 'width', undefined);
    var height = GetAdvancedValue(config, 'height', undefined);
    var radius = GetAdvancedValue(config, 'radius', undefined);
    var fillStyle = GetAdvancedValue(config, 'fillStyle', undefined);
    var strokeStyle = GetAdvancedValue(config, 'strokeStyle', undefined);
    var lineWidth = GetAdvancedValue(config, 'lineWidth', undefined);
    var fillColor2 = GetAdvancedValue(config, 'fillColor2', undefined);
    var isHorizontalGradient = GetAdvancedValue(config, 'isHorizontalGradient', true);
    var gameObject = new RoundRectangle(this.scene, 0, 0, width, height, radius, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient);
    BuildGameObject(this.scene, gameObject, config);
    return gameObject;
};