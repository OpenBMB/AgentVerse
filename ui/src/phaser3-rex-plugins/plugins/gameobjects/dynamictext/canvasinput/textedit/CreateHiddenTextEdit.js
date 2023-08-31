import HiddenTextEdit from './HiddenTextEdit.js';
import CopyProperty from '../../../../utils/object/CopyProperty.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const PropertiesList = [
    'inputType',
    'onOpen', 'onFocus', 'onClose', 'onBlur', 'onUpdate',
    'enterClose',
    'readOnly', 'maxLength', 'minLength', 'selectAll'
];

var CreateHiddenTextEdit = function (parent, parentConfig) {
    var config = GetValue(parentConfig, 'edit');
    if (config === undefined) {
        config = {};
    }

    CopyProperty(parentConfig, config, PropertiesList);

    return new HiddenTextEdit(parent, config);
}

export default CreateHiddenTextEdit;