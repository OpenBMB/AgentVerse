import GetValue from '../../utils/object/GetValue.js';
import PageLoader from '../pageloader/PageLoader.js';
import GetQuery from './GetQuery.js';
import LoadMethods from './LoadMethods.js';
import DeleteMethods from './DeleteMethods.js';
import Copy from '../../utils/array/Copy.js';
import Save from './Save.js';
import SaveItems from './SaveItems.js';
import GetItemCount from './GetItemCount.js';

class ItemTable {
    constructor(config) {
        this.pageLoader = new PageLoader();

        this.setClassName(GetValue(config, 'className', 'Item'));
        this.setItemCount(GetValue(config, 'itemCount', 100));
        this.setQuery();  // Reset to base query
        this.primaryKeys = [];
        var primaryKeys = GetValue(config, 'primaryKeys', undefined);
        if (primaryKeys) {
            this.setPrimaryKey(primaryKeys);
        }

        this.setOwnerReadMode(GetValue(config, 'ownerRead', undefined));
        this.setOwnerWriteMode(GetValue(config, 'ownerWrite', undefined));

    }

    setClassName(className) {
        this.customClass = Parse.Object.extend(className);
        return this;
    }

    setPrimaryKey(key) {
        if (!key) {
            this.primaryKeys.length = 0;
        } else if (typeof (key) === 'string') {
            this.primaryKeys.length = 1;
            this.primaryKeys[0] = key;
        } else {
            Copy(this.primaryKeys, key);
        }
        return this;
    }

    setOwnerReadMode(mode) {
        this.ownerRead = mode;
        return this;
    }

    setOwnerWriteMode(mode) {
        this.ownerWrite = mode;
        return this;
    }

    createItem() {
        return new this.customClass();
    }

    setItemCount(itemCount) {
        this.pageLoader.setItemCount(itemCount);
        return this;
    }

    setQuery(query) {
        if (query === undefined) {
            query = this.baseQuery;
        }
        this.pageLoader.setQuery(query);
        return this;
    }

    get baseQuery() {
        return new Parse.Query(this.customClass);
    }

    get startIndex() {
        return this.pageLoader.startIndex;
    }

    get pageIndex() {
        return this.pageLoader.pageIndex;
    }

    get isLastPage() {
        return this.pageLoader.isLastPage;
    }
}

var methods = {
    getQuery: GetQuery,
    save: Save,
    saveItems: SaveItems,
    getItemCount: GetItemCount,
}
Object.assign(
    ItemTable.prototype,
    LoadMethods,
    DeleteMethods,
    methods
);

export default ItemTable;