import AlphaMaskImage from './AlphaMaskImage.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('alphaMaskImage', function (x, y, key, frame, config) {
    var gameObject = new AlphaMaskImage(this.scene, x, y, key, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.AlphaMaskImage', AlphaMaskImage);

export default AlphaMaskImage;