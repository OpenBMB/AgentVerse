import ItemTable from './ItemTable.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../utils/object/SetValue.js';

ObjectFactory.register('itemTable', function (config) {
    return new ItemTable(config);
});

SetValue(window, 'RexPlugins.Parse.ItemTable', ItemTable);

export default ItemTable;