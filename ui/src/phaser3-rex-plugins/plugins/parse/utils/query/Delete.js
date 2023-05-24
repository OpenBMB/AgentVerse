import Load from './Load.js';

var Delete = function (query) {
    query.select('id');

    return Load(query)
        .then(function (items) {
            if (items.length === 0) {
                return Promise.resolve();
            }
            return Parse.Object.destroyAll(items);
        });
}

export default Delete;