import CreateAnyLabel from './utils/CreateAnyLabel.js';
import TextBox from '../../textbox/TextBox.js';

var CreateTextBox = function (scene, data, view, styles, customBuilders) {
    return CreateAnyLabel(scene, data, view, styles, customBuilders, TextBox);
}

export default CreateTextBox;