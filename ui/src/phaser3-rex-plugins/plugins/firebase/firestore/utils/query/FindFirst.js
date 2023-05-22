import Query from './Query';

var FindFirst = function (query, testCallback) {
    var out = {
        doc: undefined,
        index: undefined
    }
    var startIndex = 0;
    return Query({
        query: query,
        forEachPageCallback: function (querySnapshot) {
            var docs = querySnapshot.docs,
                doc;
            for (var i = 0, cnt = docs.length; i < cnt; i++) {
                doc = docs[i];
                if (testCallback(doc)) {
                    out.doc = doc;
                    out.index = startIndex + i;
                    return true;
                }
            }
            startIndex += querySnapshot.size;
        },
        resolveCallback: function () {
            return out;
        }
    });
}

export default FindFirst;