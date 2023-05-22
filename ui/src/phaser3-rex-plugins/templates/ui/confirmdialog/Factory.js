import ConfirmDialog from './ConfirmDialog.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('confirmDialog', function (config, creators) {
    var gameObject = new ConfirmDialog(this.scene, config, creators);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ConfirmDialog', ConfirmDialog);

export default ConfirmDialog;