import SimpleDropDownList from './SimpleDropDownList.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('simpleDropDownList', function (config, creators) {
    var gameObject = new SimpleDropDownList(this.scene, config, creators);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.SimpleDropDownList', SimpleDropDownList);

export default SimpleDropDownList;