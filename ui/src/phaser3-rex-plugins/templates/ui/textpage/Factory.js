import TextPage from './TextPage.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('textPage', function (gameObject, config) {
    return new TextPage(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.TextPage', TextPage);

export default TextPage;