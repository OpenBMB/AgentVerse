import TabPages from './TabPages.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('tabPages', function (config) {
    var gameObject = new TabPages(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.TabPages', TabPages);

export default TabPages;