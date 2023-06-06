import StatesRoundRectangle from '../../statesroundrectangle/StatesRoundRectangle.js';
import NinePatch from '../../ninepatch/NinePatch.js';

const PhaserImage = Phaser.GameObjects.Image;
const PhaserNineSlice = Phaser.GameObjects.NineSlice;

var CreateBackground = function (scene, config) {
    var gameObjectType;
    if (config) {
        if (config.hasOwnProperty('type')) {
            gameObjectType = config.type;
        } else {
            if (config.hasOwnProperty('leftWidth')) {
                gameObjectType = 'nineSlice';
            } else if (config.hasOwnProperty('key')) {
                gameObjectType = 'image';
            }
        }
    }

    var gameObject;
    switch (gameObjectType) {
        case 'image':
            gameObject = new PhaserImage(scene, 0, 0, config.key, config.frame);
            break;

        case 'nineSlice':
            if (PhaserNineSlice) {
                gameObject = new PhaserNineSlice(
                    scene, 0, 0, config.key, config.frame, 0, 0,
                    config.leftWidth, config.rightWidth, config.topHeight, config.bottomHeight
                );
            } else {
                gameObject = new NinePatch(scene, config);
            }
            break;

        default:
            gameObject = new StatesRoundRectangle(scene, config);
            break;
    }

    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateBackground;