import TouchEventStop from './TouchEventStop.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('touchEventStop', function (gameObject, config) {
    return new TouchEventStop(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.TouchEventStop', TouchEventStop);

export default TouchEventStop;