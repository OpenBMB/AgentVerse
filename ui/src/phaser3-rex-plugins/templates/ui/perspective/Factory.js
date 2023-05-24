import Perspective from './Perspective.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('perspective', function (gameObject, config) {
    return new Perspective(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.Perspective', Perspective);

export default Perspective;