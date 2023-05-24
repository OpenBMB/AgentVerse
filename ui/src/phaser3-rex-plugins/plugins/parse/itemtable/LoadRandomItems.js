import Load from '../utils/query/Load.js';
import Shuffle from '../../utils/array/Shuffle.js';

var LoadRandomItems = function (query, count) {
    if (typeof (query) === 'number') {
        count = query;
        query = undefined;
    }
    if (query === undefined) {
        query = this.baseQuery;
    }
    if (count === undefined) {
        count = 1;
    }

    // Load all item Id
    query.select('id');
    var self = this;
    return Load(query)
        .then(function (items) {
            // Shuffle items
            Shuffle(items);
            count = Math.min(count, items.length);
            var itemIds = [];
            for (var i = 0; i < count; i++) {
                itemIds.push(items[i].id);
            }
            // Load first N items by item Id
            query = self.baseQuery.containedIn('objectId', itemIds);
            return Load(query)
        })
}

export default LoadRandomItems;