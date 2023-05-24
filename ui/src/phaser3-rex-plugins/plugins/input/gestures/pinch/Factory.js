import Pinch from './Pinch.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';

ObjectFactory.register('pinch', function (config) {
    return new Pinch(this.scene, config);
});

SetValue(window, 'RexPlugins.Gestures.Pinch', Pinch);

export default Pinch;