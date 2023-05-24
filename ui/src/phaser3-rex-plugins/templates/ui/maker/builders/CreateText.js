import MergeStyle from './utils/MergeStyle.js';
import SetTextureProperties from './utils/SetTextureProperties.js';

const PhaserText = Phaser.GameObjects.Text;

var CreateText = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    var gameObject = new PhaserText(scene, 0, 0, data.text, data);

    SetTextureProperties(gameObject, data);

    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateText;