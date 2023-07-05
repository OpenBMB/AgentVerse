import BBCodeText from '../../bbcodetext/BBCodeText.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const PhaserText = Phaser.GameObjects.Text;
const PhaserBitmapText = Phaser.GameObjects.BitmapText;

var CreateText = function (scene, config) {
    var type = GetValue(config, '$type');
    if (type === undefined) {
        if (!!GetValue(config, 'key')) {
            type = 'bitmaptext';
        }
    }

    var gameObject;
    switch (type) {
        case 'bitmaptext':
            var key = GetValue(config, 'key');
            var size = GetValue(config, 'size');
            if (size === undefined) {
                size = GetValue(config, 'fontSize');
            }

            gameObject = new PhaserBitmapText(scene, 0, 0, key, '', size);

            var color = GetValue(config, 'color');
            if (color !== undefined) {
                gameObject.setTint(color);
            }
            break;

        case 'text':
            gameObject = new PhaserText(scene, 0, 0, '', config);
            break;

        default:
            gameObject = new BBCodeText(scene, 0, 0, '', config);
            break;
    }

    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateText;