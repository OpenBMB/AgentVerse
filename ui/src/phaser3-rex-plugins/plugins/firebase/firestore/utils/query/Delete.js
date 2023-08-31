import Load from './Load.js';

var Delete = function (query) {
    return Load(query)
        .then(function (docs) {
            if (docs.length === 0) { // Last page, task done
                return Promise.resolve();
            }

            var tasks = [];
            var batch, actionCount;
            for (var i = 0, cnt = docs.length; i < cnt; i++) {
                if (batch === undefined) {
                    batch = firebase.firestore().batch();
                    actionCount = 0;
                }

                batch.delete(docs[i].ref);
                actionCount++;
                if (actionCount >= 500) {
                    tasks.push(batch.commit());
                    batch = undefined;
                }
            }

            if (batch) {
                tasks.push(batch.commit());
            }

            return Promise.all(tasks);
        })
}

export default Delete;