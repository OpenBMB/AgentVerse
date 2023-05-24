import CreateLabel from '../../utils/build/CreateLabel.js';
import CreateTextArea from '../../utils/build/CreateTextArea.js'

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateContent = function (scene, config, creators) {
    var type = GetValue(config, '$type');
    if (type === undefined) {
        if (config &&
            (config.hasOwnProperty('slider') || config.hasOwnProperty('scroller'))
        ) {
            type = 'textarea';
        }
    }


    var gameObject;
    switch (type) {
        case 'textarea':
            gameObject = new CreateTextArea(scene, config, creators);
            break;

        default:
            gameObject = new CreateLabel(scene, config, creators);
            break;
    }

    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateContent;