import Pan from './Pan.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';
import IsGameObject from '../../../utils/system/IsGameObject.js';

ObjectFactory.register('pan', function (gameObject, config) {
    if (!IsGameObject(gameObject)) {
        config = gameObject;
        gameObject = this.scene;
    }
    return new Pan(gameObject, config);
});

SetValue(window, 'RexPlugins.Gestures.Pan', Pan);

export default Pan;