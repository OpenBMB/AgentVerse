import Query from './Query';

var FindFirst = function (query, testCallback) {
    var out = {
        item: undefined,
        index: undefined
    }
    var startIndex = 0;
    return Query({
        query: query,
        forEachPageCallback: function (items) {
            var item;
            for (var i = 0, cnt = items.length; i < cnt; i++) {
                item = items[i];
                if (testCallback(item)) {
                    out.item = item;
                    out.index = startIndex + i;
                    return true;
                }
            }
            startIndex += items.length;
        },
        resolveCallback: function () {
            return out;
        }
    });
}

export default FindFirst;