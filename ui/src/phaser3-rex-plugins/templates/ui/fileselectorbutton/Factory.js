import FileSelectorButton from './FileSelectorButton.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('fileSelectorButton', function (config) {
    var gameObject = new FileSelectorButton(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.FileSelectorButton', FileSelectorButton);

export default FileSelectorButton;