import DropDownList from './DropDownList.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('dropDownList', function (config) {
    var gameObject = new DropDownList(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.DropDownList', DropDownList);

export default DropDownList;