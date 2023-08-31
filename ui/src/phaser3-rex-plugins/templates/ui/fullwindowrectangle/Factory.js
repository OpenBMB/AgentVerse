import FullWindowRectangle from './FullWindowRectangle.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('fullWindowRectangle', function (fillColor, fillAlpha) {
    var gameObject = new FullWindowRectangle(this.scene, fillColor, fillAlpha);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.FullWindowRectangle', FullWindowRectangle);

export default FullWindowRectangle;