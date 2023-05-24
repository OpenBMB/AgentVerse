import TransitionImage from './TransitionImage.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('transitionImage', function (x, y, texture, frame, config) {
    var gameObject = new TransitionImage(this.scene, x, y, texture, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.TransitionImage', TransitionImage);

export default TransitionImage;