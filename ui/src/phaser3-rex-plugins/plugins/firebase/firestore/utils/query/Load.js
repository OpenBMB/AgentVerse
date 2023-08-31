import Query from './Query';

var Load = function (query, count, skip, startDocRef, startMode) {
    if (count === undefined) {
        count = Infinity;
    }
    if (skip === undefined) {
        skip = 0;
    }

    var out = [];
    var startIndex = 0;
    return Query({
        query: query,
        totalLines: (skip + count),
        startDocRef: startDocRef,
        startMode: startMode,
        forEachPageCallback: function (querySnapshot) {
            var validDocs;
            var docCount = querySnapshot.size;
            var localStart = skip - startIndex;
            if (localStart <= 0) {
                validDocs = querySnapshot.docs;
            } else if (localStart < docCount) {
                validDocs = querySnapshot.docs.slice(localStart, docCount);
            }
            if (validDocs) {
                out.push(...validDocs);
            }
            startIndex += docCount;
        },
        resolveCallback: function () {
            return out;
        }
    });
}

export default Load;