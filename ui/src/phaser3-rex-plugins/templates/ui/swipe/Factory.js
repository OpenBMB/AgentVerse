import Swipe from './Swipe.js';
import ObjectFactory from '../ObjectFactory.js';
import IsGameObject from '../../../plugins/utils/system/IsGameObject.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('swipe', function (gameObject, config) {
    if (!IsGameObject(gameObject)) {
        config = gameObject;
        gameObject = this.scene;
    }
    return new Swipe(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.Swipe', Swipe);

export default Swipe;