import TagText from './TagText.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('tagText', function (x, y, text, style) {
    var gameObject = new TagText(this.scene, x, y, text, style);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.TagText', TagText);

export default TagText;