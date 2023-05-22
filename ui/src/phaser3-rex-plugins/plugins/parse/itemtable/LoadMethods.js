import Load from '../utils/query/Load.js';
import LoadRandomItems from './LoadRandomItems.js';

var Methods = {
    loadItem(itemId, select) {
        if (typeof (itemId) === 'string') {
            var query = this.baseQuery;
            if (select) {
                query = query.select(select);
            }
            return query.get(itemId);
        } else { // Query by primary keys
            var query = this.getQuery(itemId).limit(1);
            if (select) {
                query = query.select(select);
            }
            return query.find()
                .then(function (result) {
                    return Promise.resolve(result[0]);
                })
        }
    },

    loadPage(pageIndex) {
        return this.pageLoader.loadPage(pageIndex);
    },

    loadCurrentPage() {
        return this.pageLoader.loadCurrentPage();
    },

    loadNextPage() {
        return this.pageLoader.loadNextPage();
    },

    loadPreviousPage() {
        return this.pageLoader.loadPreviousPage();
    },

    loadItems(startIndex, itemCount) {
        return this.pageLoader.loadItems(startIndex, itemCount);
    },

    load(query) {
        if (query === undefined) {
            query = this.baseQuery;
        }
        return Load(query);
    },

    loadRandomItems: LoadRandomItems
}

export default Methods;