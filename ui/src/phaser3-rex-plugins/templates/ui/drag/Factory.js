import Drag from './Drag.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('drag', function (gameObject, config) {
    return new Drag(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.Drag', Drag);

export default Drag;