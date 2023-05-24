import HiddenEdit from './HiddenEdit.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('hiddenEdit', function (textObject, config) {
    var gameObject = new HiddenEdit(textObject, config);
    // Note: Don't add this game object into scene
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.HiddenEdit', HiddenEdit);

export default HiddenEdit;