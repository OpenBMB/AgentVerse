import Tweaker from './Tweaker.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('tweaker', function (config) {
    var gameObject = new Tweaker(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.Tweaker', Tweaker);

export default Tweaker;