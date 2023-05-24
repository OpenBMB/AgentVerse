import CreateAnyImage from './utils/CreateAnyImage.js';

const PhaserImage = Phaser.GameObjects.Image;

var CreateImage = function (scene, data, view, styles, customBuilders) {
    return CreateAnyImage(scene, data, view, styles, customBuilders, PhaserImage);
}

export default CreateImage;