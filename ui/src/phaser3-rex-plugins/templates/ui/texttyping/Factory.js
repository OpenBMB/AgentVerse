import TextTyping from './TextTyping.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('textTyping', function (gameObject, config) {
    return new TextTyping(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.TextTyping', TextTyping);

export default TextTyping;