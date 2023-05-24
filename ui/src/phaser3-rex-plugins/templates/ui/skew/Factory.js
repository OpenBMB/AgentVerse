import Skew from './Skew.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('skew', function (gameObject, config) {
    return new Skew(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.Skew', Skew);

export default Skew;