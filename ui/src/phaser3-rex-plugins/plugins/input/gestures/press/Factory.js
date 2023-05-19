import Press from './Press.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';
import IsGameObject from '../../../utils/system/IsGameObject.js';

ObjectFactory.register('press', function (gameObject, config) {
    if (!IsGameObject(gameObject)) {
        config = gameObject;
        gameObject = this.scene;
    }
    return new Press(gameObject, config);
});

SetValue(window, 'RexPlugins.Gestures.Press', Press);

export default Press;