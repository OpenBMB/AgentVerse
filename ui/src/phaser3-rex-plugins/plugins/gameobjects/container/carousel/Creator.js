import Carousel from './Carousel.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

export default function (config, addToScene) {
    if (config === undefined) { config = {}; }
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var width = GetValue(config, 'width', 256);
    var height = GetValue(config, 'height', 256);
    var gameObject = new Carousel(this.scene, 0, 0, width, height, config);

    // set properties wo modify children
    gameObject.syncChildrenEnable = false;
    BuildGameObject(this.scene, gameObject, config);
    // sync properties of children
    gameObject.syncChildrenEnable = true;
    gameObject.syncPosition().syncVisible().syncAlpha();

    return gameObject;
}