import Flip from './Flip.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('flip', function (gameObject, config) {
    return new Flip(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.Flip', Flip);

export default Flip;