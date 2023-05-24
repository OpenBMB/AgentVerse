import GetValue from '../../../utils/object/GetValue.js';
import IsPlainObject from '../../../utils/object/IsPlainObject.js';
import LoadFirstPage from './LoadFirstPage.js';
import LoadNextPage from './LoadNextPage.js';
import LoadPreviousPage from './LoadPreviousPage.js';
import LoadCurrentPage from './LoadCurrentPage.js';
import LoadInRange from './LoadInRange.js';

class PageLoader {
    constructor(config) {
        this.setItemCount(GetValue(config, 'itemCount', 100));
        this.setQuery(GetValue(config, 'query', undefined));
        this.setDataMode(GetValue(config, 'dataMode', 0));
        this.setBaselineDoc(GetValue(config, 'baselineDoc', undefined), GetValue(config, 'baselineMode', undefined));
        this.pageIndex = undefined;
        this.baselineDocRef = undefined;
        this.baselineMode = 'startAt';
        this.startItemIndex = undefined;
        this.endItemIndex = undefined;
        this.cacheItems = undefined;
        this.isFullPage = undefined;
    }

    setItemCount(count) {
        this.itemCount = count;
        return this;
    }

    setQuery(nextQuery, prevQuery) {
        if (IsPlainObject(nextQuery)) {
            var config = nextQuery;
            this.nextQuery = config.next;
            this.prevQuery = config.previous;
        } else {
            this.nextQuery = nextQuery;
            this.prevQuery = prevQuery;
        }

        this.pageIndex = undefined;
        this.isFullPage = undefined;
        return this;
    }

    setDataMode(mode) {
        if (typeof (mode) === 'string') {
            mode = DATAMODE[mode];
        }
        this.dataMode = mode;
        return this;
    }

    setBaselineDoc(doc, mode) {
        if (doc) {
            this.baselineDocRef = doc.ref;
            this.baselineMode = mode; // 'startAt' or 'startAfter'
        } else {
            this.baselineDocRef = undefined;
        }
        return this;
    }
}

var methods = {
    loadFirstPage: LoadFirstPage,
    loadNextPage: LoadNextPage,
    loadPreviousPage: LoadPreviousPage,
    loadCurrentPage: LoadCurrentPage,
    load: LoadInRange
}

Object.assign(
    PageLoader.prototype,
    methods
);

const DATAMODE = {
    static: 0,
    dynamic: 1
}

export default PageLoader;