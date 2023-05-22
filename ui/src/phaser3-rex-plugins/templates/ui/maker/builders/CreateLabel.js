import CreateAnyLabel from './utils/CreateAnyLabel.js';
import Label from '../../label/Label.js';

var CreateLabel = function (scene, data, view, styles, customBuilders) {
    return CreateAnyLabel(scene, data, view, styles, customBuilders, Label);
}

export default CreateLabel;