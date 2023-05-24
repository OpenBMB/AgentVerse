import CustomProgress from './CustomProgress.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('customProgress', function (x, y, width, height, config) {
    var gameObject = new CustomProgress(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.CustomProgress', CustomProgress);

export default CustomProgress;