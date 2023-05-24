import TextEdit from './TextEdit.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('textEdit', function (gameObject, config) {
    return new TextEdit(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.TextEdit', TextEdit);

export default TextEdit;