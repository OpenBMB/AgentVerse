import ContainerLite from './ContainerLite.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const GetValue = Phaser.Utils.Objects.GetValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

export default function (config, addToScene) {
    if (config === undefined) { config = {}; }
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var width = GetAdvancedValue(config, 'width', 1);
    var height = GetAdvancedValue(config, 'height', width);
    var children = GetValue(config, 'children', undefined);
    var gameObject = new ContainerLite(this.scene, 0, 0, width, height);

    // set properties wo modify children
    gameObject.syncChildrenEnable = false;
    BuildGameObject(this.scene, gameObject, config);
    // sync properties of children
    gameObject.syncChildrenEnable = true;

    gameObject.add(children);
    return gameObject;
}