import EventEmitterMethods from '../../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../../utils/object/GetValue.js';
import Table from '../../../utils/struct/Tree.js';
import ColumnUpdater from './read/ColumnUpdater.js';
import RowUpdater from './read/RowUpdater.js';
import Pagepdater from './read/PageUpdater.js';
import Init from './read/Init.js';
import SetData from './write/SetData.js';
import RemoveData from './write/RemoveData.js';
import IncValue from './write/IncValue.js';
import Transaction from './write/Transaction.js';
import UpdateData from './write/UpdateData.js';
import RemoveDataOnDisconnect from './write/RemoveDataOnDisconnect.js';
import SetDataOnDisconnect from './write/SetDataOnDisconnect.js';

class ItemTable {
    constructor(config) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);
        this.eventNameMap = GetValue(config, 'eventNames', DefaultEventNames);

        this.database = firebase.database();
        this.table = new Table();
        this.setTableType(GetValue(config, 'type', 3));
        this.setRootPath(GetValue(config, 'root', ''));
        this.initialFlag = false;
    }

    shutdown() {
        this.updater.destroy();
        this
            .destroyEventEmitter()
            .stopUpdate();
    }

    destroy() {
        this.shutdown();
    }

    setRootPath(rootPath) {
        this.rootPath = rootPath;
        this.updater.setRootPath(rootPath);
        return this;
    }

    setTableType(type) {
        if (typeof (type) === 'string') {
            type = TABLE_TYPE[type];
        }
        this.tableType = type;
        var UpdaterClass = UpdaterClasses[type];
        this.updater = new UpdaterClass({
            type: type,
            eventEmitter: this.getEventEmitter(),
            eventNames: this.eventNameMap,
            table: this.table
        })


        return this;
    }

    getRootRef() {
        return this.database.ref(this.rootPath)
    }

    getRef(key0, key1, key2) {
        var ref = this.getRootRef();
        ref = (key0) ? ref.child(key0) : ref;
        ref = (key1) ? ref.child(key1) : ref;
        ref = (key2) ? ref.child(key2) : ref;
        return ref;
    }

    startUpdate() {
        Init.call(this);
        this.updater
            .startUpdate();
        return this;
    }

    stopUpdate() {
        this.updater.stopUpdate();
        return this;
    }

    clear() {
        this.updater.clear();
        return this;
    }

    getData() {
        return this.table.getValue(arguments);
    }

    cloneData() {
        return this.table.cloneValue(arguments);
    }
}

var UpdaterClasses = {
    1: ColumnUpdater,
    2: RowUpdater,
    3: Pagepdater
};

var methods = {
    setData: SetData,
    removeData: RemoveData,
    incValue: IncValue,
    transaction: Transaction,
    updateData: UpdateData,
    removeDataOnDisconnect: RemoveDataOnDisconnect,
    setDataOnDisconnect: SetDataOnDisconnect
}
Object.assign(
    ItemTable.prototype,
    EventEmitterMethods,
    methods
);

const TABLE_TYPE = {
    '1d': 1,
    '2d': 2,
    '3d': 3
}

const DefaultEventNames = {
    init: 'init',
    update: 'update',
    addkey0: 'addkey0',
    removekey0: 'removekey0',
    changekey0: 'changekey0',
    addkey1: 'addkey1',
    removekey1: 'removekey1',
    changekey1: 'changekey1',
    addkey2: 'addkey2',
    removekey2: 'removekey2',
    changekey2: 'changekey2'
}

export default ItemTable