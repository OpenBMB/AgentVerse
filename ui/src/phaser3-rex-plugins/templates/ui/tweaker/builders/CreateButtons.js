import CreateRoundRectangle from '../../utils/build/CreateRoundRectangle.js';
import CreateTitleLabel from './CreateTitleLabel.js';
import CreateLabel from '../../utils/build/CreateLabel.js';
import CreateButtonsSizer from '../gameobjects/utils/CreateButtons.js';
import InputRow from '../gameobjects/inputrow/InputRow.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateButtons = function (scene, config, style) {
    // Title
    var titleStyle = GetValue(style, 'title') || {};
    var title = CreateTitleLabel(scene, config, titleStyle);

    // Buttons
    var buttonsConfig = config.buttons;
    var buttonStyle = GetValue(style, 'button') || {};
    var buttons = [];
    for (var i = 0, cnt = buttonsConfig.length; i < cnt; i++) {
        var button = CreateLabel(scene, buttonStyle);
        buttons.push(button);

        var buttonConfig = buttonsConfig[i];
        button.resetDisplayContent({
            text: buttonConfig.label
        })
        button.callback = buttonConfig.callback;
    }
    var buttonsSizer = CreateButtonsSizer(scene, {
        buttons: buttons,
        expand: (buttons.length === 1),
    })

    // Background
    var backgroundStyle = GetValue(style, 'background') || {};
    var background = CreateRoundRectangle(scene, backgroundStyle);

    // InputRow
    var inputRow = new InputRow(scene, {
        ...style,

        inputTitle: title,
        inputField: buttonsSizer,
        background: background,
    })
    scene.add.existing(inputRow);

    inputRow.setTitle(config);

    buttonsSizer
        .on('button.click', function (button) {
            button.callback(inputRow.bindingTarget);
        })

    return inputRow;
}

export default CreateButtons;