import CircleMaskImage from './CircleMaskImage.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('circleMaskImage', function (x, y, key, frame, config) {
    var gameObject = new CircleMaskImage(this.scene, x, y, key, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.CircleMaskImage', CircleMaskImage);

export default CircleMaskImage;