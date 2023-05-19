import InTouching from './InTouching.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('inTouching', function (gameObject, config) {
    return new InTouching(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.InTouching', InTouching);

export default InTouching;