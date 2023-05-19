import CustomShapes from './CustomShapes.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('customShapes', function (x, y, width, height, config) {
    var gameObject = new CustomShapes(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.CustomShapes', CustomShapes);

export default CustomShapes;