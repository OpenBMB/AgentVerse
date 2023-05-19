import Pan from './Pan.js';
import ObjectFactory from '../ObjectFactory.js';
import IsGameObject from '../../../plugins/utils/system/IsGameObject.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('pan', function (gameObject, config) {
    if (!IsGameObject(gameObject)) {
        config = gameObject;
        gameObject = this.scene;
    }
    return new Pan(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.Pan', Pan);

export default Pan;