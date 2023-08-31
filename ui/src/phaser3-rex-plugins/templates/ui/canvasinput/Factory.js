import CanvasInput from './CanvasInput.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('canvasInput', function (x, y, fixedWidth, fixedHeight, config) {
    var gameObject = new CanvasInput(this.scene, x, y, fixedWidth, fixedHeight, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.CanvasInput', CanvasInput);

export default CanvasInput;