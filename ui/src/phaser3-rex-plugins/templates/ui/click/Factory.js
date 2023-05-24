import Click from './Click.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('click', function (gameObject, config) {
    return new Click(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.Click', Click);

export default Click;