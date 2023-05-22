import Press from './Press.js';
import ObjectFactory from '../ObjectFactory.js';
import IsGameObject from '../../../plugins/utils/system/IsGameObject.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('press', function (gameObject, config) {
    if (!IsGameObject(gameObject)) {
        config = gameObject;
        gameObject = this.scene;
    }
    return new Press(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.Press', Press);

export default Press;