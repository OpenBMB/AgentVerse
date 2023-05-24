import Query from './Query.js';

var Load = function (query, startIndex, totalLines) {
    var out = [];
    return Query({
        query: query,
        startIndex: startIndex,
        totalLines: totalLines,
        forEachPageCallback: function (items) {
            out.push(...items);
        },
        resolveCallback: function () {
            return out;
        }
    })
};
export default Load;