import Rotate from './Rotate.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';

ObjectFactory.register('rotate', function (config) {
    return new Rotate(this.scene, config);
});

SetValue(window, 'RexPlugins.Gestures.Rotate', Rotate);

export default Rotate;