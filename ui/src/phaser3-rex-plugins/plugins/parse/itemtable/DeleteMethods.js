import Delete from '../utils/query/Delete.js';

var Methods = {
    deleteItem(itemId) {
        return this.createItem().set('id', itemId).destroy();
    },

    delete(query) {
        if (query === undefined) {
            query = this.baseQuery;
        }
        return Delete(query);
    }
}

export default Methods;