import BBCodeText from './BBCodeText.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('BBCodeText', function (x, y, text, style) {
    var gameObject = new BBCodeText(this.scene, x, y, text, style);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.BBCodeText', BBCodeText);

export default BBCodeText;