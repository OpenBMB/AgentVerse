import Shake from './Shake.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('shake', function (gameObject, config) {
    return new Shake(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.Shake', Shake);

export default Shake;