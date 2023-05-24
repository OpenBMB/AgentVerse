import Swipe from './Swipe.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';
import IsGameObject from '../../../utils/system/IsGameObject.js';

ObjectFactory.register('swipe', function (gameObject, config) {
    if (!IsGameObject(gameObject)) {
        config = gameObject;
        gameObject = this.scene;
    }
    return new Swipe(gameObject, config);
});

SetValue(window, 'RexPlugins.Gestures.Swipe', Swipe);

export default Swipe;