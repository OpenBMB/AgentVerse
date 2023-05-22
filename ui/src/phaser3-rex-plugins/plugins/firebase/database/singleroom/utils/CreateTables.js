import ItemTable from '../../itemtable/ItemTable.js';
import GetValue from '../../../../utils/object/GetValue.js';

var CreateTables = function (config) {
    var tablesConfig = GetValue(config, 'tables', undefined);
    if (tablesConfig === undefined) {
        return {};
    }

    var tableConfig;
    var tables = {};
    for (var i = 0, cnt = tablesConfig.length; i < cnt; i++) {
        tableConfig = tablesConfig[i];
        tables[tableConfig.key] = CreateTable.call(this, tableConfig);
    }

    return tables;
}
var CreateTable = function (config) {
    var key = config.key;
    var table = new ItemTable({
        eventEmitter: this.getEventEmitter(),
        root: this.getItemTablePath(key),

        type: GetValue(config, 'type', 1),
        eventNames: {
            init: `tables.${key}.init`,
            update: `tables.${key}.update`,
            addkey0: `tables.${key}.addkey0`,
            removekey0: `tables.${key}.removekey0`,
            changekey0: `tables.${key}.changekey0`,
            addkey1: `tables.${key}.addkey1`,
            removekey1: `tables.${key}.removekey1`,
            changekey1: `tables.${key}.changekey1`,
            addkey2: `tables.${key}.addkey2`,
            removekey2: `tables.${key}.removekey2`,
            changekey2: `tables.${key}.changekey2`
        }
    });

    this
        .on('room.join', function () {
            table
                .startUpdate()
        })
        .on('room.leave', function () {
            table
                .clear()
                .stopUpdate()
        })

    return table;
}

export default CreateTables;