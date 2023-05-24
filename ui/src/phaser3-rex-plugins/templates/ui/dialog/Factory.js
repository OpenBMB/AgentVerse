import Dialog from './Dialog.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('dialog', function (config) {
    var gameObject = new Dialog(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.Dialog', Dialog);

export default Dialog;