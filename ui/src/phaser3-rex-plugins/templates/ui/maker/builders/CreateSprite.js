import CreateAnyImage from './utils/CreateAnyImage.js';

const Sprite = Phaser.GameObjects.Sprite;

var CreateSprite = function (scene, data, view, styles, customBuilders) {
    return CreateAnyImage(scene, data, view, styles, customBuilders, Sprite);
}

export default CreateSprite;