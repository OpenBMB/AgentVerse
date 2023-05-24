import { FileChooser } from './FileChooser.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('fileChooser', function (config) {
    var gameObject = new FileChooser(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.FileChooser', FileChooser);

export default FileChooser;