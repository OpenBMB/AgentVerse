import Anchor from "./Anchor.js";
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('anchor', function (gameObject, config) {
    return new Anchor(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.Anchor', Anchor);

export default Anchor;