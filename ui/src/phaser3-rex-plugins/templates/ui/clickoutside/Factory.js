import ClickOutside from './ClickOutside.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('clickOutside', function (gameObject, config) {
    return new ClickOutside(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.ClickOutside', ClickOutside);

export default ClickOutside;