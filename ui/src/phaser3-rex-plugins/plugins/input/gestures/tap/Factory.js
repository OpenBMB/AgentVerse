import Tap from './Tap.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';
import IsGameObject from '../../../utils/system/IsGameObject.js';

ObjectFactory.register('tap', function (gameObject, config) {
    if (!IsGameObject(gameObject)) {
        config = gameObject;
        gameObject = this.scene;
    }
    return new Tap(gameObject, config);
});

SetValue(window, 'RexPlugins.Gestures.Tap', Tap);

export default Tap;