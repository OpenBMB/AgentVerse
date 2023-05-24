import ImageBox from './ImageBox.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('imageBox', function (x, y, texture, frame, config) {
    var gameObject = new ImageBox(this.scene, x, y, texture, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ImageBox', ImageBox);

export default ImageBox;