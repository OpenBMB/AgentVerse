import GridSizer from './GridSizer.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('gridSizer', function (x, y, minWidth, minHeight, columnCount, rowCount, columnProportions, rowProportion, config) {
    var gameObject = new GridSizer(this.scene, x, y, minWidth, minHeight, columnCount, rowCount, columnProportions, rowProportion, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.GridSizer', GridSizer);

export default GridSizer;