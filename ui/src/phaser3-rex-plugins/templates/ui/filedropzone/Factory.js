import FileDropZone from './FileDropZone.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('fileDropZone', function (config) {
    var gameObject = new FileDropZone(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.FileDropZone', FileDropZone);

export default FileDropZone;